interface StrapiBlock {
  id: string;
  __component: string;
  [key: string]: unknown;
}

interface SlateNode {
  type: string;
  children: SlateChild[];
  format?: string;
  [key: string]: unknown;
}

interface SlateChild {
  text?: string;
  type?: string;
  children?: SlateChild[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  [key: string]: unknown;
}

function processTextFormatting(child: SlateChild): string {
  let text = child.text || '';
  
  if (child.bold) {
    text = `<strong>${text}</strong>`;
  }
  if (child.italic) {
    text = `<em>${text}</em>`;
  }
  if (child.underline) {
    text = `<u>${text}</u>`;
  }
  
  return text;
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

  let result = '';
  let currentListItems = '';
  let currentListType = '';

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    
    switch (node.type) {
      case 'paragraph':
        // Если у нас есть накопленные элементы списка, сначала выводим их
        if (currentListItems) {
          const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
          result += `<${listTag}>${currentListItems}</${listTag}>`;
          currentListItems = '';
          currentListType = '';
        }
        
        const children = node.children as SlateChild[];
        const text = children
          .map(child => {
            if (child.text) {
              return processTextFormatting(child);
            }
            if (child.children) {
              return slateToHtml(child.children as SlateNode[]);
            }
            return '';
          })
          .join('');
        result += `<p>${text}</p>`;
        break;
      
      case 'list':
        // Если у нас есть накопленные элементы списка, сначала выводим их
        if (currentListItems) {
          const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
          result += `<${listTag}>${currentListItems}</${listTag}>`;
          currentListItems = '';
        }
        
        // Обрабатываем элементы списка напрямую, без рекурсии
        const listChildren = node.children as SlateNode[];
        const listItems = listChildren
          .map(child => {
            if (child.type === 'list-item') {
              const itemChildren = child.children as SlateChild[];
              const itemText = itemChildren
                .map(itemChild => {
                  if (itemChild.text) {
                    return processTextFormatting(itemChild);
                  }
                  return '';
                })
                .join('');
              return `<li>${itemText}</li>`;
            }
            return '';
          })
          .join('');
        
        const format = node.format;
        const listTag = format === 'ordered' ? 'ol' : 'ul';
        result += `<${listTag}>${listItems}</${listTag}>`;
        break;
      
      case 'list-item':
        const itemChildren = node.children as SlateChild[];
        const itemText = itemChildren
          .map(child => {
            if (child.text) {
              return processTextFormatting(child);
            }
            return '';
          })
          .join('');
        currentListItems += `<li>${itemText}</li>`;
        break;
      
      case 'bulleted-list':
        const bulletChildren = node.children as SlateNode[];
        const bulletItems = bulletChildren
          .map(child => {
            if (child.type === 'list-item') {
              const itemChildren = child.children as SlateChild[];
              const itemText = itemChildren
                .map(itemChild => {
                  if (itemChild.text) {
                    return processTextFormatting(itemChild);
                  }
                  return '';
                })
                .join('');
              return `<li>${itemText}</li>`;
            }
            return '';
          })
          .join('');
        result += `<ul>${bulletItems}</ul>`;
        break;
      
      case 'numbered-list':
        const numberedChildren = node.children as SlateNode[];
        const numberedItems = numberedChildren
          .map(child => {
            if (child.type === 'list-item') {
              const itemChildren = child.children as SlateChild[];
              const itemText = itemChildren
                .map(itemChild => {
                  if (itemChild.text) {
                    return processTextFormatting(itemChild);
                  }
                  return '';
                })
                .join('');
              return `<li>${itemText}</li>`;
            }
            return '';
          })
          .join('');
        result += `<ol>${numberedItems}</ol>`;
        break;
      
      default:
        break;
    }
  }

  // Если остались накопленные элементы списка, выводим их
  if (currentListItems) {
    const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
    result += `<${listTag}>${currentListItems}</${listTag}>`;
  }

  return result;
}

export function isStrapiBlocks(value: unknown): value is StrapiBlock[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null && '__component' in value[0];
}

export function isSlateNodes(value: unknown): value is SlateNode[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null && 'type' in value[0] && 'children' in value[0];
} 