const rawImages = import.meta.glob<string>(
  '/catalogo img new/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
);

const imageMap = new Map<string, string>();

for (const [fullPath, resolvedUrl] of Object.entries(rawImages)) {
  const fileName = fullPath.split('/').pop();
  if (fileName && typeof resolvedUrl === 'string') {
    imageMap.set(fileName.toLowerCase(), resolvedUrl);
  }
}

export function getCatalogImageUrl(fileName?: string): string | undefined {
  if (!fileName) return undefined;
  return imageMap.get(fileName.toLowerCase());
}

export function getAllLoadedCatalogFiles(): string[] {
  return Array.from(imageMap.keys());
}
