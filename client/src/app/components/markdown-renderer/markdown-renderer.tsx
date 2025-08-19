import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import styles from './markdown-renderer.module.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <div className={`${styles.markdownContent} ${className || ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Custom components for better styling
          h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
          h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
          h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
          h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
          h5: ({ children }) => <h5 className={styles.h5}>{children}</h5>,
          h6: ({ children }) => <h6 className={styles.h6}>{children}</h6>,
          p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
          ul: ({ children }) => <ul className={styles.unorderedList}>{children}</ul>,
          ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
          li: ({ children }) => <li className={styles.listItem}>{children}</li>,
          blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className={styles.inlineCode}>{children}</code>
            ) : (
              <code className={`${styles.codeBlock} ${className}`}>{children}</code>
            );
          },
          pre: ({ children }) => <pre className={styles.preBlock}>{children}</pre>,
          a: ({ href, children }) => (
            <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className={styles.image} />
          ),
          table: ({ children }) => <table className={styles.table}>{children}</table>,
          thead: ({ children }) => <thead className={styles.tableHead}>{children}</thead>,
          tbody: ({ children }) => <tbody className={styles.tableBody}>{children}</tbody>,
          tr: ({ children }) => <tr className={styles.tableRow}>{children}</tr>,
          th: ({ children }) => <th className={styles.tableHeader}>{children}</th>,
          td: ({ children }) => <td className={styles.tableCell}>{children}</td>,
          hr: () => <hr className={styles.horizontalRule} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
