/**
 * Browser-side chart renderer for canvas items.
 *
 * Chart instances belong to the browser: they are mounted from a validated
 * serializable specification and destroyed when an item is deleted or its
 * section collapses. Renderer instances never enter persisted or
 * synchronized data. Only approved controllers are registered here.
 */
import { Chart, registerables, type ChartConfiguration } from 'chart.js/auto';
import { VennDiagramController, EulerDiagramController, ArcSlice } from 'chartjs-chart-venn';
import { validateChartSpec, deriveSetRegions, type ChartSpec, type QuantitativeChartSpec, type SetDiagramSpec } from './spec.ts';

Chart.register(...registerables, VennDiagramController, EulerDiagramController, ArcSlice);

export interface MountedChart { destroy(): void }

/** Mounts a chart on a canvas element from a plain-data specification. */
export function mountChart(canvas: HTMLCanvasElement, rawSpec: unknown): MountedChart {
  const spec = validateChartSpec(rawSpec);
const chart = new Chart(canvas, configurationFor(spec) as unknown as ChartConfiguration);
  return { destroy: () => chart.destroy() };
}

function configurationFor(spec: ChartSpec): ChartConfiguration {
  if (spec.kind === 'venn' || spec.kind === 'euler') return setDiagramConfiguration(spec as SetDiagramSpec);
  return quantitativeConfiguration(spec as QuantitativeChartSpec);
}

function quantitativeConfiguration(spec: QuantitativeChartSpec): ChartConfiguration {
  const isCircular = ['pie', 'doughnut', 'polarArea'].includes(spec.kind);
  return {
    type: spec.kind,
    data: {
      labels: [...spec.labels],
      datasets: spec.datasets.map((dataset, index) => ({
        label: dataset.label ?? `dataset ${index + 1}`,
        data: [...dataset.values],
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      ...(spec.title ? { plugins: { title: { display: true, text: spec.title } } } : {}),
      // Euler area fitting approximates; tooltips and adjacent data stay authoritative.
      ...(isCircular ? {} : {}),
    },
  } as unknown as ChartConfiguration;
}

function setDiagramConfiguration(spec: SetDiagramSpec): ChartConfiguration {
  const regions = deriveSetRegions(spec.sets);
  return {
    type: spec.kind === 'euler' ? 'eulerDiagram' : 'vennDiagram',
    data: {
      datasets: [{
        label: spec.title ?? 'sets',
        data: regions.map(region => ({ sets: region.sets, value: region.value, label: region.label })),
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: { raw: unknown }) => {
              const raw = context.raw as { sets: string[]; value: number; label?: string } | undefined;
              return raw ? `${raw.sets.length > 1 ? raw.label : raw.sets[0]}: ${raw.value} members` : '';
            },
          },
        },
        ...(spec.title ? { title: { display: true, text: spec.title } } : {}),
      },
    },
  } as unknown as ChartConfiguration;
}
