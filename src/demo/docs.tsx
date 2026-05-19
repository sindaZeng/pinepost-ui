import type { DemoContext, DocItem } from "./types";
import { createFormExamples } from "./examples/form";
import { createTableExamples } from "./examples/table";
import { createUploadExamples } from "./examples/upload";
import { createSelectionExamples } from "./examples/selection";
import { createFoundationCatalogDocs } from "./examples/catalog-foundation";
import { createSelectionCatalogDocs } from "./examples/catalog-selection";
import { createDataCatalogDocs } from "./examples/catalog-data";
import { createSurfaceCatalogDocs } from "./examples/catalog-surface";
import { createMaturityCatalogDocs } from "./examples/catalog-maturity";
import { createCommercialPressureLabDocs } from "./examples/commercial-pressure-lab";
import { createGuideCatalogDocs } from "./examples/catalog-guide";

export function createDemoDocs(context: DemoContext): DocItem[] {
  const formExamples = createFormExamples(context);
  const tableExamples = createTableExamples(context);
  const uploadExamples = createUploadExamples(context);
  const selectionExamples = createSelectionExamples(context);
  const catalogContext = {
    ...context,
    ...formExamples,
    ...tableExamples,
    ...uploadExamples,
    ...selectionExamples
  };

  return [
    ...createFoundationCatalogDocs(catalogContext),
    ...createSelectionCatalogDocs(catalogContext),
    ...createDataCatalogDocs(catalogContext),
    ...createSurfaceCatalogDocs(catalogContext),
    ...createMaturityCatalogDocs(catalogContext),
    ...createCommercialPressureLabDocs(catalogContext),
    ...createGuideCatalogDocs(catalogContext)
  ];
}
