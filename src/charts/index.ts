export {
  type ChartSpec, type QuantitativeChartSpec, type SetDiagramSpec, type QuantitativeKind, type SetKind,
  type NamedSet, type SetRegion, MAX_VENN_SETS, validateChartSpec, deriveSetRegions,
} from './spec.ts';
export { mountChart, type MountedChart } from './renderer.ts';
