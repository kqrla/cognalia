/**
 * The canvas document model: sections and items, not graph edges.
 *
 * The canvas exists first, out-of-call. Everything that happens on a canvas
 * in-call is just canvas operations with a session id attached; the document
 * itself never knows a call exists. All operations are plain, serializable
 * data applied by a pure function. There is no persistence, network
 * synchronization or collaborative shell in this module yet.
 */
import { validateChartSpec, type ChartSpec } from '../charts/spec.ts';

export interface Position { x: number; y: number }
export interface Dimensions { width: number; height: number }

export interface ItemCore {
  id: string;
  sectionId: string;
  position: Position;
  dimensions: Dimensions;
}
export interface TextItem extends ItemCore { kind: 'text'; text: string }
export interface SketchItem extends ItemCore { kind: 'sketch'; strokeCount: number }
export interface ChartItem extends ItemCore { kind: 'chart'; chart: ChartSpec }
export type CanvasItem = TextItem | SketchItem | ChartItem;
export type ItemContent = Pick<TextItem, 'kind' | 'text'> | Pick<SketchItem, 'kind' | 'strokeCount'> | Pick<ChartItem, 'kind' | 'chart'>;
/** a canvas operation carries an item draft: content, placement, and the section it lands in */
export type ItemDraft = (Omit<TextItem, 'sectionId'> | Omit<SketchItem, 'sectionId'> | Omit<ChartItem, 'sectionId'>) & { sectionId: string; index?: number };

export interface Section {
  id: string;
  title: string;
  parentSectionId: string | null;
  expanded: boolean;
  /** item ids in board order */
  items: string[];
  /** direct child section ids in board order */
  sections: string[];
}

export interface CanvasDocument {
  id: string;
  title: string;
  rootSectionId: string;
  sections: Record<string, Section>;
  items: Record<string, CanvasItem>;
}

export type CanvasOperation =
  | { type: 'create-canvas'; canvasId: string; title: string; sessionId?: string }
  | { type: 'create-section'; sectionId: string; title: string; parentSectionId: string; index?: number; sessionId?: string }
  | { type: 'rename-section'; sectionId: string; title: string; sessionId?: string }
  | { type: 'set-section-expanded'; sectionId: string; expanded: boolean; sessionId?: string }
  | { type: 'create-item'; item: ItemDraft; sessionId?: string }
  | { type: 'update-text-item'; itemId: string; text: string; sessionId?: string }
  | { type: 'update-chart-item'; itemId: string; chart: unknown; sessionId?: string }
  | { type: 'move-item'; itemId: string; toSectionId: string; index?: number; sessionId?: string }
  | { type: 'group-items-into-section'; itemIds: string[]; sectionId: string; title: string; sessionId?: string }
  | { type: 'move-section'; sectionId: string; toSectionId: string; index?: number; sessionId?: string }
  | { type: 'delete-item'; itemId: string; sessionId?: string }
  | { type: 'delete-section'; sectionId: string; sessionId?: string };

function fail(reason: string): never { throw new Error(`canvas operation rejected: ${reason}`); }

/** Applies an ordered batch of operations; the batch either lands whole or throws before mutating. */
export function applyCanvasOperations(doc: CanvasDocument, operations: CanvasOperation[]): CanvasDocument {
  let next = doc;
  for (const operation of operations) next = applyCanvasOperation(next, operation);
  return next;
}

function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0 || value.length > 128) fail(`${field} must be a non-empty short string`);
}

function assertFinite(value: unknown, field: string): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) fail(`${field} must be a finite number`);
}

function clone<T>(value: T): T { return structuredClone(value); }

function sectionOf(doc: CanvasDocument, id: string): Section {
  const section = doc.sections[id];
  if (!section) fail(`unknown section "${id}"`);
  return section;
}

function itemOf(doc: CanvasDocument, id: string): CanvasItem {
  const item = doc.items[id];
  if (!item) fail(`unknown item "${id}"`);
  return item;
}

function containsSection(doc: CanvasDocument, ancestorId: string, candidateId: string): boolean {
  let current: Section | undefined = doc.sections[candidateId];
  while (current && current.parentSectionId) {
    if (current.parentSectionId === ancestorId) return true;
    current = doc.sections[current.parentSectionId];
  }
  return false;
}

/** Applies one operation to a document, returning a new document. */
export function applyCanvasOperation(doc: CanvasDocument, operation: CanvasOperation): CanvasDocument {
  const next = clone(doc);
  switch (operation.type) {
    case 'create-canvas': {
      assertString(operation.canvasId, 'canvasId');
      assertString(operation.title, 'title');
      const rootSectionId = `${operation.canvasId}-root`;
      if (next.sections[rootSectionId] || next.items[operation.canvasId]) fail(`canvas "${operation.canvasId}" already exists`);
      next.id = operation.canvasId;
      next.title = operation.title;
      next.rootSectionId = rootSectionId;
      next.sections = { [rootSectionId]: { id: rootSectionId, title: operation.title, parentSectionId: null, expanded: true, items: [], sections: [] } };
      next.items = {};
      return next;
    }
    case 'create-section': {
      assertString(operation.sectionId, 'sectionId');
      assertString(operation.title, 'title');
      const parent = sectionOf(next, operation.parentSectionId);
      if (next.sections[operation.sectionId]) fail(`section "${operation.sectionId}" already exists`);
      next.sections[operation.sectionId] = { id: operation.sectionId, title: operation.title, parentSectionId: parent.id, expanded: true, items: [], sections: [] };
      insert(parent.sections, operation.sectionId, operation.index);
      return next;
    }
    case 'rename-section': {
      assertString(operation.title, 'title');
      sectionOf(next, operation.sectionId).title = operation.title;
      return next;
    }
    case 'set-section-expanded': {
      if (typeof operation.expanded !== 'boolean') fail('expanded must be a boolean');
      sectionOf(next, operation.sectionId).expanded = operation.expanded;
      return next;
    }
    case 'create-item': {
      const draft = clone(operation.item);
      const section = sectionOf(next, draft.sectionId);
      if (draft.id in next.items || draft.id in next.sections) fail(`item id "${draft.id}" already exists`);
      if (typeof draft.id !== 'string' || draft.id.length === 0) fail('item id is required');
      assertFinite(draft.position.x, 'position.x');
      assertFinite(draft.position.y, 'position.y');
      assertFinite(draft.dimensions.width, 'dimensions.width');
      assertFinite(draft.dimensions.height, 'dimensions.height');
      if (draft.dimensions.width <= 0 || draft.dimensions.height <= 0) fail('item dimensions must be positive');
      if (draft.kind === 'text') {
        if (typeof draft.text !== 'string') fail('text items need text');
      } else if (draft.kind === 'sketch') {
        if (!Number.isInteger(draft.strokeCount) || draft.strokeCount < 0) fail('sketch items need a non-negative stroke count');
      } else {
        draft.chart = validateChartSpec(draft.chart);
      }
      insert(section.items, draft.id, draft.index);
      delete draft.index;
      next.items[draft.id] = draft as CanvasItem;
      return next;
    }
    case 'update-text-item': {
      const item = itemOf(next, operation.itemId);
      if (item.kind !== 'text') fail(`item "${operation.itemId}" is not a text item`);
      if (typeof operation.text !== 'string') fail('text must be a string');
      item.text = operation.text;
      return next;
    }
    case 'update-chart-item': {
      const item = itemOf(next, operation.itemId);
      if (item.kind !== 'chart') fail(`item "${operation.itemId}" is not a chart item`);
      item.chart = validateChartSpec(operation.chart);
      return next;
    }
    case 'move-item': {
      const item = itemOf(next, operation.itemId);
      const from = sectionOf(next, item.sectionId);
      const to = sectionOf(next, operation.toSectionId);
      from.items = from.items.filter(id => id !== item.id);
      insert(to.items, item.id, operation.index);
      item.sectionId = to.id;
      return next;
    }
    case 'group-items-into-section': {
      assertString(operation.sectionId, 'sectionId');
      assertString(operation.title, 'title');
      if (!Array.isArray(operation.itemIds) || operation.itemIds.length === 0) fail('grouping needs at least one item');
      if (next.sections[operation.sectionId]) fail(`section "${operation.sectionId}" already exists`);
      const items = operation.itemIds.map(id => itemOf(next, id));
      const parent = sectionOf(next, items[0].sectionId);
      if (items.some(item => item.sectionId !== parent.id)) fail('grouped items must come from one section');
      next.sections[operation.sectionId] = { id: operation.sectionId, title: operation.title, parentSectionId: parent.id, expanded: true, items: [], sections: [] };
      parent.sections.push(operation.sectionId);
      for (const item of items) {
        parent.items = parent.items.filter(id => id !== item.id);
        next.sections[operation.sectionId].items.push(item.id);
        item.sectionId = operation.sectionId;
      }
      return next;
    }
    case 'move-section': {
      const section = sectionOf(next, operation.sectionId);
      const to = sectionOf(next, operation.toSectionId);
      if (section.id === to.id || containsSection(next, section.id, to.id)) fail('a section cannot move into itself or its own descendant');
      if (section.parentSectionId === to.id) return next;
      if (section.parentSectionId) {
        const from = next.sections[section.parentSectionId];
        from.sections = from.sections.filter(id => id !== section.id);
      }
      insert(to.sections, section.id, operation.index);
      section.parentSectionId = to.id;
      return next;
    }
    case 'delete-item': {
      const item = itemOf(next, operation.itemId);
      const section = sectionOf(next, item.sectionId);
      section.items = section.items.filter(id => id !== item.id);
      delete next.items[item.id];
      return next;
    }
    case 'delete-section': {
      const section = sectionOf(next, operation.sectionId);
      if (section.id === next.rootSectionId) fail('the root section cannot be deleted');
      const parent = sectionOf(next, section.parentSectionId!);
      parent.sections = parent.sections.filter(id => id !== section.id);
      for (const id of descendantsOf(next, section.id)) delete next.sections[id];
      for (const id of descendantItemIds(next, section.id)) delete next.items[id];
      delete next.sections[section.id];
      return next;
    }
  }
  fail(`unknown operation type "${String((operation as { type?: string }).type)}"`);
}

function insert(target: string[], id: string, index?: number): void {
  if (index === undefined || index >= target.length) target.push(id);
  else target.splice(Math.max(0, Math.trunc(index)), 0, id);
}

function descendantsOf(doc: CanvasDocument, sectionId: string): string[] {
  const result: string[] = [];
  for (const child of doc.sections[sectionId].sections) {
    result.push(child, ...descendantsOf(doc, child));
  }
  return result;
}

function descendantItemIds(doc: CanvasDocument, sectionId: string): string[] {
  const section = doc.sections[sectionId];
  return [...section.items, ...section.sections.flatMap(child => descendantItemIds(doc, child))];
}

/**
 * Item ids visible on the board: items of expanded sections, descending only
 * while a section is expanded. A collapsed section is a structural summary,
 * not a zoom trick; its contents are simply not in view.
 */
export function visibleItemIds(doc: CanvasDocument): string[] {
  const walk = (sectionId: string): string[] => {
    const section = sectionOf(doc, sectionId);
    if (!section.expanded) return [];
    return [...section.items, ...section.sections.flatMap(walk)];
  };
  return walk(doc.rootSectionId);
}

export interface ChartLifecycle {
  /** chart items that entered view and need a renderer instance mounted */
  mount: string[];
  /** chart items that left view (collapse, move away, or delete) and need their renderer released */
  unmount: string[];
  /** visible chart items whose specification changed; remount to reflect new data */
  remount: string[];
}

/**
 * The bridge between the document model and browser chart renderers:
 * renderer instances are mounted for chart items that entered view and
 * destroyed for items that left view or were deleted. Renderer instances
 * never enter the document.
 */
export function chartLifecycle(prev: CanvasDocument, next: CanvasDocument): ChartLifecycle {
  const isChartItem = (item: CanvasItem | undefined): item is ChartItem => item?.kind === 'chart';
  const wasVisible = new Set(visibleItemIds(prev));
  const nowVisible = new Set(visibleItemIds(next));
  const mount: string[] = [];
  const unmount: string[] = [];
  const remount: string[] = [];
  for (const id of nowVisible) {
    if (!wasVisible.has(id) && isChartItem(next.items[id])) mount.push(id);
  }
  for (const id of wasVisible) {
    const before = prev.items[id];
    const after = next.items[id];
    if (!nowVisible.has(id)) { if (isChartItem(before)) unmount.push(id); continue; }
    if (isChartItem(before) && isChartItem(after) && JSON.stringify(before.chart) !== JSON.stringify(after.chart)) remount.push(id);
  }
  return { mount, unmount, remount };
}
