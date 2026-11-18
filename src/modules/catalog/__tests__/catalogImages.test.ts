import { describe, expect, it } from 'vitest';
import { CATALOG_PRODUCTS } from '../data/products.data';
import { getAllLoadedCatalogFiles, getCatalogImageUrl } from '../data/imageLoader';

describe('catalog imageLoader coverage', () => {
  it('incluye todas las imágenes presentes en catalogo img new sin omitir ninguna', () => {
    const loadedFiles = getAllLoadedCatalogFiles();
    const mappedFiles = new Set(
      CATALOG_PRODUCTS.flatMap((p) => [
        p.imageFile?.toLowerCase(),
        ...(p.imageFiles?.map((f) => f.toLowerCase()) ?? []),
      ]).filter((f): f is string => Boolean(f)),
    );

    expect(loadedFiles.length).toBeGreaterThanOrEqual(20);
    for (const file of loadedFiles) {
      expect(mappedFiles.has(file)).toBe(true);
      expect(getCatalogImageUrl(file)).toBeTruthy();
    }
  });
});
