import * as sanitizeHtml from 'sanitize-html';

export class QuestionSanitizer {
  
  static sanitizeQuestionContent(html: string): string {
    if (!html) return '';
    
    return sanitizeHtml(html, {
      // TipTap-compatible tags
      allowedTags: [
        // Basic formatting
        'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        
        // Lists
        'ul', 'ol', 'li',
        
        // Tables
        'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'colgroup', 'col',
        
        // Other content
        'blockquote', 'hr', 'a', 'span', 'div', 'mark',
        
        // Images
        'img'
      ],
      
      allowedAttributes: {
        'a': ['href', 'title', 'target', 'rel'],
        'img': ['src', 'alt', 'width', 'height', 'data-image-id', 'data-original-width', 'data-original-height', 'data-original-filename', 'data-explanation', 'data-position'],
        'span': ['style', 'class', 'id', 'data-explanation', 'data-position'],
        'div': ['style', 'class', 'id', 'data-position', 'data-attachment-type', 'data-explanation'],
        'mark': ['data-explanation'],
        
        // Table attributes
        'table': ['style', 'class', 'id'],
        'thead': ['style', 'class'],
        'tbody': ['style', 'class'],
        'tfoot': ['style', 'class'],
        'tr': ['style', 'class'],
        'th': ['style', 'class', 'colspan', 'rowspan'],
        'td': ['style', 'class', 'colspan', 'rowspan'],
        'colgroup': ['style', 'class'],
        'col': ['style', 'class'],
        
        // Allow class and id on all elements
        '*': ['class', 'id']
      },
      
      allowedStyles: {
        '*': {
          'color': [/^#[0-9a-f]{3,6}$/i],
          'text-align': [/^(left|right|center|justify)$/],
          'background-color': [/^#[0-9a-f]{3,6}$/i],
          'width': [/^\d+px$/, /^\d+%$/, /^auto$/],
          'height': [/^\d+px$/, /^\d+%$/, /^auto$/],
          'min-width': [/^\d+px$/],
          'min-height': [/^\d+px$/],
          'border': [/^[\d\w\s#(),-]+$/],
          'border-collapse': [/^(collapse|separate)$/],
          'padding': [/^\d+px$/],
          'margin': [/^\d+px$/],
          'vertical-align': [/^(top|middle|bottom|baseline)$/]
        }
      },
      
      allowedSchemes: ['http', 'https', 'mailto'],
      
      disallowedTagsMode: 'discard',
      
      transformTags: {
        'a': (tagName, attribs) => {
          const href = attribs.href;
          // Block javascript: and data: URLs
          if (href && (href.startsWith('javascript:') || href.startsWith('data:'))) {
            delete attribs.href;
          }
          return {
            tagName: 'a',
            attribs: {
              ...attribs,
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          };
        }
      }
    });
  }
}