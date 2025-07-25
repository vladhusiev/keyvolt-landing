type SlateNode = {
  type?: string
  format?: string
  children?: SlateNode[]
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  url?: string
  level?: number
}

export function renderSlateToHtml(nodes: SlateNode[]): string {
  return nodes.map(renderNode).join('')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeHtmlAttr(text: string): string {
  return escapeHtml(text).replace(/'/g, '&#39;')
}

function renderNode(node: SlateNode): string {
  const renderChildren = () => (node.children || []).map(renderNode).join('')

  // Text leaf node
  if ('text' in node && node.text !== undefined) {
    let text = escapeHtml(node.text)

    if (node.bold) text = `<strong>${text}</strong>`
    if (node.italic) text = `<em>${text}</em>`
    if (node.underline) text = `<u>${text}</u>`
    if (node.strikethrough) text = `<s>${text}</s>`
    if (node.code) text = `<code>${text}</code>`

    return text
  }

  // Non-text nodes
  switch (node.type) {
    case 'paragraph':
      return `<p>${renderChildren()}</p>`
    case 'list':
      const tag = node.format === 'unordered' ? 'ul' : 'ol'
      return `<${tag}>${renderChildren()}</${tag}>`
    case 'list-item':
      return `<li>${renderChildren()}</li>`
    case 'heading': {
      const level = Math.min(Math.max(node.level || 1, 1), 6) // clamp 1–6
      return `<h${level}>${renderChildren()}</h${level}>`
    }
    case 'link':
      const href = escapeHtmlAttr(node.url || '#')
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${renderChildren()}</a>`
    default:
      return renderChildren() // fallback (render children directly)
  }
}
