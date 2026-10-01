import { mountChart, type MountedChart } from '../../src/charts/index.ts';
import { deriveSetRegions, type NamedSet, type SetDiagramSpec, type QuantitativeChartSpec } from '../../src/charts/spec.ts';
import { FILTERS } from '../../src/atlas/content/index.ts';

const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;
const canvas = $<HTMLCanvasElement>('quant');
const quantSpec: QuantitativeChartSpec = {
  kind: 'bar',
  title: 'imported wandery content volume',
  labels: ['countries', 'membership layers', 'conflicts', 'wars', 'trade routes', 'major events'],
  datasets: [{ label: 'entries', values: [41, 25, 17, 25, 8, 17] }],
};
let quant: MountedChart | null = null;
function remountQuant(): void {
  quant?.destroy();
  quant = mountChart(canvas, quantSpec);
}
$<HTMLSelectElement>('quant-kind').addEventListener('change', event => {
  quantSpec.kind = (event.target as HTMLSelectElement).value as QuantitativeChartSpec['kind'];
  remountQuant();
});
remountQuant();

const sets: NamedSet[] = (['eu', 'eea', 'nato'] as const).map(id => ({ key: id, label: FILTERS[id].label, members: [...FILTERS[id].countries] }));
const setSpec: SetDiagramSpec = { kind: 'venn', title: 'imported memberships', sets };
const setCanvas = $<HTMLCanvasElement>('sets');
const mount = $<HTMLButtonElement>('mount');
const unmount = $<HTMLButtonElement>('unmount');
let setChart: MountedChart | null = null;
function remountSets(): void {
  setChart?.destroy();
  setChart = mountChart(setCanvas, setSpec);
  $<HTMLPreElement>('regions').textContent = deriveSetRegions(sets).map(r => `${r.label}: ${r.value}`).join('\n');
}
mount.addEventListener('click', () => { remountSets(); mount.setAttribute('aria-pressed', 'true'); unmount.disabled = false; });
unmount.addEventListener('click', () => { setChart?.destroy(); setChart = null; mount.setAttribute('aria-pressed', 'false'); unmount.disabled = true; });
function setLayout(kind: 'venn' | 'euler'): void {
  setSpec.kind = kind;
  $<HTMLButtonElement>('layout-venn').setAttribute('aria-pressed', String(kind === 'venn'));
  $<HTMLButtonElement>('layout-euler').setAttribute('aria-pressed', String(kind === 'euler'));
  if (setChart) remountSets();
}
$<HTMLButtonElement>('layout-venn').addEventListener('click', () => setLayout('venn'));
$<HTMLButtonElement>('layout-euler').addEventListener('click', () => setLayout('euler'));
remountSets(); mount.setAttribute('aria-pressed', 'true'); unmount.disabled = false;
