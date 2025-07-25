interface StrapiBlock {
  id: string;
  __component: string;
  [key: string]: unknown;
}

interface SlateNode {
  type: string;
  children: SlateChild[];
  [key: string]: unknown;
}

interface SlateChild {
  text?: string;
  type?: string;
  children?: SlateChild[];
  [key: string]: unknown;
}

export function blocksToHtml(blocks: StrapiBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks.map(block => {
    switch (block.__component) {
      case 'shared.rich-text':
        return block.body || '';
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

export function slateToHtml(nodes: SlateNode[]): string {
  if (!nodes || !Array.isArray(nodes)) {
    return '';
  }

  return nodes.map(node => {
    switch (node.type) {
      case 'paragraph':
        const children = node.children as SlateChild[];
        const text = children
          .map(child => {
            if (child.text) {
              return child.text;
            }
            if (child.children) {
              return slateToHtml(child.children as SlateNode[]);
            }
            return '';
          })
          .join('');
        return `<p>${text}</p>`;
      
      case 'list-item':
        const listChildren = node.children as SlateChild[];
        const listText = listChildren
          .map(child => {
            if (child.text) {
              return child.text;
            }
            return '';
          })
          .join('');
        return `<li>${listText}</li>`;
      
      case 'bulleted-list':
        const bulletChildren = node.children as SlateNode[];
        const bulletItems = bulletChildren
          .map(child => slateToHtml([child]))
          .join('');
        return `<ul>${bulletItems}</ul>`;
      
      case 'numbered-list':
        const numberedChildren = node.children as SlateNode[];
        const numberedItems = numberedChildren
          .map(child => slateToHtml([child]))
          .join('');
        return `<ol>${numberedItems}</ol>`;
      
      default:
        return '';
    }
  }).join('');
}

export function isStrapiBlocks(value: unknown): value is StrapiBlock[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null && '__component' in value[0];
}

export function isSlateNodes(value: unknown): value is SlateNode[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null && 'type' in value[0] && 'children' in value[0];
} 