import { describe, expect, it } from 'vitest';
import { CATALOG_PRODUCTS } from '../data/products.data';
import { getAllLoadedCatalogFiles, getCatalogImageUrl } from '../data/imageLoader';

describe('catalog imageLoader coverage', () => {
  it('incluye todas las imágenes presentes en catalogo img new sin omitir ninguna', () => {
    const loadedFiles = getAllLoadedCatalogFiles();
    const mappedFiles = new Set(
      CATALOG_PRODUCTS.map((p) => p.imageFile?.toLowerCase()).filter(Boolean),
    );

    expect(loadedFiles.length).toBeGreaterThanOrEqual(20);
    for (const file of loadedFiles) {
      expect(mappedFiles.has(file)).toBe(true);
      expect(getCatalogImageUrl(file)).toBeTruthy();
    }
  });
});
