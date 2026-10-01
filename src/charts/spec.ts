/**
 * Constrained, serializable chart specifications for canvas items.
 *
 * Only plain data is accepted. Executable callbacks, remote script URLs,
 * plugin names and arbitrary chart.js configurations from agent output or
 * chat attachments are rejected. Imported chart data is evidence, never an
 * instruction to load code.
 */

export type QuantitativeKind = 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar';
export type SetKind = 'venn' | 'euler';
export type ChartKind = QuantitativeKind | SetKind;

const QUANTITATIVE_KINDS: readonly QuantitativeKind[] = ['bar', 'line', 'scatter', 'bubble', 'pie', 'doughnut', 'polarArea', 'radar'];
const SET_KINDS: readonly SetKind[] = ['venn', 'euler'];
/** Venn layouts support up to five sets; more cannot be drawn faithfully. */
export const MAX_VENN_SETS = 5;

export interface QuantitativeDataset { label?: string; values: number[] }
export interface QuantitativeChartSpec {
  kind: QuantitativeKind;
  title?: string;
  labels: string[];
  datasets: QuantitativeDataset[];
}

export interface NamedSet {
  /** stable identifier, unique per diagram */
  key: string;
  label: string;
  /** authoritative member identifiers; shared members must use the same identifier in every set */
  members: string[];
}

export interface SetDiagramSpec {
  kind: SetKind;
  title?: string;
  sets: NamedSet[];
}

export type ChartSpec = QuantitativeChartSpec | SetDiagramSpec;

function fail(reason: string): never { throw new Error(`chart specification rejected: ${reason}`); }

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assertFiniteNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) fail('data values must be finite numbers');
}

function assertIdentifier(value: unknown): asserts value is string {
  if (typeof value !== 'string' || value.length === 0 || value.length > 64) fail('set members and keys must be non-empty short strings');
  if (/^(https?:|javascript:|data:)/i.test(value)) fail('set members and keys are identifiers, not URLs');
}

function assertNoDangerousKeys(value: Record<string, unknown>, allowed: string[]): void {
  for (const key of Object.keys(value)) if (!allowed.includes(key)) fail(`unsupported field "${key}"`);
  for (const [key, v] of Object.entries(value)) {
    if (v !== null && (typeof v === 'function' || typeof v === 'object' && !Array.isArray(v) && !isPlainObject(v))) fail(`field "${key}" must be plain data`);
    if (typeof v === 'string' && /^(https?:|javascript:|data:)/i.test(v)) fail(`field "${key}" must not contain a URL`);
  }
}

/** Throws with a reason for anything unsafe or ambiguous. */
export function validateChartSpec(spec: unknown): ChartSpec {
  if (!isPlainObject(spec)) fail('specification must be a plain object');
  const { kind } = spec;
  const ALL_KINDS: readonly string[] = [...QUANTITATIVE_KINDS, ...SET_KINDS];
  if (typeof kind !== 'string' || !ALL_KINDS.includes(kind)) fail(`unknown chart kind "${String(kind)}"`);
  if (QUANTITATIVE_KINDS.includes(kind as QuantitativeKind)) return validateQuantitative(spec as unknown as QuantitativeChartSpec);
  return validateSetDiagram(spec as unknown as SetDiagramSpec);
}

function validateQuantitative(spec: QuantitativeChartSpec): QuantitativeChartSpec {
  assertNoDangerousKeys(spec as unknown as Record<string, unknown>, ['kind', 'title', 'labels', 'datasets']);
  if (spec.title !== undefined && typeof spec.title !== 'string') fail('title must be a string');
  if (!Array.isArray(spec.labels)) fail('labels must be an array');
  spec.labels.forEach(label => { if (typeof label !== 'string') fail('labels must be strings'); });
  if (!Array.isArray(spec.datasets) || spec.datasets.length === 0) fail('datasets must be a non-empty array');
  for (const dataset of spec.datasets) {
    assertNoDangerousKeys(dataset as unknown as Record<string, unknown>, ['label', 'values']);
    if (dataset.label !== undefined && typeof dataset.label !== 'string') fail('dataset label must be a string');
    if (!Array.isArray(dataset.values)) fail('dataset values must be an array');
    dataset.values.forEach(assertFiniteNumber);
  }
  return spec;
}

function validateSetDiagram(spec: SetDiagramSpec): SetDiagramSpec {
  assertNoDangerousKeys(spec as unknown as Record<string, unknown>, ['kind', 'title', 'sets']);
  if (spec.title !== undefined && typeof spec.title !== 'string') fail('title must be a string');
  if (!Array.isArray(spec.sets) || spec.sets.length < 2) fail('set diagrams need at least two sets');
  if (spec.sets.length > MAX_VENN_SETS) fail(`set diagrams support at most ${MAX_VENN_SETS} sets, received ${spec.sets.length}`);
  const seen = new Set<string>();
  for (const set of spec.sets) {
    assertNoDangerousKeys(set as unknown as Record<string, unknown>, ['key', 'label', 'members']);
    assertIdentifier(set.key); assertIdentifier(set.label);
    if (seen.has(set.key)) fail(`duplicate set key "${set.key}"`);
    seen.add(set.key);
    if (!Array.isArray(set.members)) fail('members must be an array of identifiers');
    set.members.forEach(assertIdentifier);
  }
  return spec;
}

export interface SetRegion { sets: string[]; value: number; label: string }

/**
 * Derives every region of a set diagram from the supplied member lists:
 * each subset of sets gets the exact count of members present in all of
 * them and in no other set. Because member lists are authoritative, no
 * overlap is guessed and no region is silently treated as zero.
 */
export function deriveSetRegions(sets: NamedSet[]): SetRegion[] {
  const keys = sets.map(s => s.key);
  const regions: SetRegion[] = [];
  for (let size = 1; size <= keys.length; size++) {
    for (const combination of combinations(keys, size)) {
      const members = sets.filter(s => combination.includes(s.key)).map(s => s.members);
      const rest = sets.filter(s => !combination.includes(s.key)).map(s => s.members);
      const inAll = intersection(members);
      const value = rest.length === 0 ? inAll.length : difference(inAll, union(rest)).length;
      if (value > 0) regions.push({ sets: combination, value, label: combination.map(key => sets.find(s => s.key === key)!.label).join(' ∩ ') });
    }
  }
  return regions;
}

function combinations<T>(items: T[], size: number): T[][] {
  if (size === 1) return items.map(item => [item]);
  const result: T[][] = [];
  for (let i = 0; i <= items.length - size; i++) for (const tail of combinations(items.slice(i + 1), size - 1)) result.push([items[i], ...tail]);
  return result;
}

function intersection(memberLists: string[][]): string[] {
  const [first, ...rest] = memberLists;
  return first.filter(member => rest.every(list => list.includes(member)));
}

function union(memberLists: string[][]): string[] {
  return [...new Set(memberLists.flat())];
}

function difference(a: string[], b: string[]): string[] {
  return a.filter(member => !b.includes(member));
}
