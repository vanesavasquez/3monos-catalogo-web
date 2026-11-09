import { useEffect, useRef, useState } from 'react';

interface UseInfiniteCatalogOptions {
  totalItems: number;
  pageSize?: number;
  resetKey: string;
}

export function useInfiniteCatalog({
  totalItems,
  pageSize = 8,
  resetKey,
}: UseInfiniteCatalogOptions) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [resetKey, pageSize]);

  const hasMore = visibleCount < totalItems;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + pageSize, totalItems));
        }
      },
      { rootMargin: '220px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, pageSize, totalItems]);

  return {
    visibleCount,
    hasMore,
    sentinelRef,
    loadMore: () => setVisibleCount((prev) => Math.min(prev + pageSize, totalItems)),
  };
}
