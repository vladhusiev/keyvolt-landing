interface StrapiBlock {
  id: string;
  __component: string;
  [key: string]: unknown;
}

export function blocksToHtml(blocks: StrapiBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks.map(block => {
    switch (block.__component) {
      case 'shared.rich-text':
        return (block.body as string) || '';
      case 'shared.media':
        const file = block.file as { url: string; alternativeText?: string };
        return file ? `<img src="${file.url}" alt="${file.alternativeText || ''}" />` : '';
      case 'shared.quote':
        return `<blockquote>${(block.body as string) || ''}</blockquote>`;
      default:
        return '';
    }
  }).join('');
}

export function isStrapiBlocks(value: unknown): value is StrapiBlock[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null && '__component' in value[0];
} 