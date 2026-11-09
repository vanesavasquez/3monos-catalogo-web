import type { CategoryFilterValue, CategoryOption } from '../types/catalog.types';
import './CategoryFilterBar.css';

interface CategoryFilterBarProps {
  categories: CategoryOption[];
  activeCategory: CategoryFilterValue;
  onSelect: (category: CategoryFilterValue) => void;
}

export function CategoryFilterBar({
  categories,
  activeCategory,
  onSelect,
}: CategoryFilterBarProps) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filtrar catálogo por categoría">
      {categories.map((cat) => {
        const isActive = cat.value === activeCategory;
        return (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`filter-bar__btn ${isActive ? 'filter-bar__btn--active' : ''}`}
            onClick={() => onSelect(cat.value)}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
