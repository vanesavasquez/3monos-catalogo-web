import { useMemo, useState } from 'react';
import { useCart } from '@modules/cart';
import { CATALOG_PRODUCTS, CATEGORY_OPTIONS } from '../data/products.data';
import { useInfiniteCatalog } from '../hooks/useInfiniteCatalog';
import type { CategoryFilterValue } from '../types/catalog.types';
import { CategoryFilterBar } from './CategoryFilterBar';
import { EmptyCategoryState } from './EmptyCategoryState';
import { ProductCard } from './ProductCard';
import './CatalogSection.css';

export function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilterValue>('todos');
  const { items, addTen } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todos') {
      return CATALOG_PRODUCTS;
    }
    return CATALOG_PRODUCTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const { visibleCount, hasMore, sentinelRef, loadMore } = useInfiniteCatalog({
    totalItems: filteredProducts.length,
    pageSize: 8,
    resetKey: activeCategory,
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const activeOption = CATEGORY_OPTIONS.find((opt) => opt.value === activeCategory);

  const quantityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.product.id, item.quantity);
    }
    return map;
  }, [items]);

  return (
    <section id="catalogo" className="catalog" aria-label="Catálogo de productos">
      <div className="container">
        <CategoryFilterBar
          categories={CATEGORY_OPTIONS}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {filteredProducts.length === 0 ? (
          <EmptyCategoryState categoryLabel={activeOption?.label ?? 'Categoría'} />
        ) : (
          <>
            <div className="catalog__grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantityInCart={quantityMap.get(product.id) ?? 0}
                  onAddTen={addTen}
                />
              ))}
            </div>

            {hasMore && (
              <div ref={sentinelRef} className="catalog__infinite-trigger">
                <button
                  type="button"
                  className="catalog__load-more-btn"
                  onClick={loadMore}
                >
                  Mostrando {visibleProducts.length} de {filteredProducts.length} · Ver más
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
