// download-as-pdf for a concept explanation. uses html2canvas to
// snapshot a rendered dom node (preserving fonts, spacing, mermaid
// diagrams) then jspdf to slice that canvas across A4 pages so long
// explanations don't get cropped. this beats relying on the browser's
// print dialog because the output stays consistent regardless of the
// user's print stylesheet, zoom level, or dark mode preference.

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

export const downloadExplanationAsPdf = async (
  element: HTMLElement,
  meta: { concept: string; system: string },
) => {
  // capture exactly what's on screen — keep the live background and
  // computed colors so the pdf is as vibrant as the rendered ui.
  // bumped scale to 3 for crisp text + saturated swatches.
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 3,
    useCORS: true,
    logging: false,
    windowWidth: element.scrollWidth,
    foreignObjectRendering: false,
    onclone: (doc, node) => {
      // make sure the cloned subtree picks up the same body background
      // (otherwise the cloned root paints over our card colors).
      const bg = getComputedStyle(document.body).backgroundColor;
      (node as HTMLElement).style.background = bg;
      (node as HTMLElement).style.padding = "24px";
      (node as HTMLElement).style.borderRadius = "0";
    },
  });

  const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 32;

  const imgWidth = pageWidth - margin * 2;
  const ratio = imgWidth / canvas.width;
  const imgHeight = canvas.height * ratio;

  // simple multi-page slicing: draw the same image with a negative
  // y-offset to peel pages off the bottom.
  const dataUrl = canvas.toDataURL("image/png");
  let remaining = imgHeight;
  let position = margin;

  // header on first page only
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text(meta.concept, margin, margin - 8);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(120);
  pdf.text(`via ${meta.system} · analogize`, pageWidth - margin, margin - 8, { align: "right" });
  pdf.setTextColor(0);

  while (remaining > 0) {
    pdf.addImage(dataUrl, "PNG", margin, position, imgWidth, imgHeight);
    remaining -= pageHeight - margin * 2;
    if (remaining > 0) {
      pdf.addPage();
      position = position - (pageHeight - margin * 2);
    }
  }

  // footer page numbers
  const total = pdf.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text(`${i} / ${total}`, pageWidth / 2, pageHeight - 16, { align: "center" });
  }

  pdf.save(`analogize-${slugify(meta.concept)}.pdf`);
};
