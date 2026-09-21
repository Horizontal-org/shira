import * as sanitizeHtml from 'sanitize-html';
import * as cheerio from 'cheerio';
import { BadRequestException } from '@nestjs/common';
import { htmlSyntaxIssues } from './advanced-html.util';

export class QuestionSanitizer {
  static validateAdvancedQuestion(html: string, explanations: Array<{ index: string | number }>, appType: string): void {
    const $ = cheerio.load(html || '', null, false);
    const body = $('#component-text-1.advanced-html-editor');

    if (!body.length) return;

    if (appType !== 'email' || body.length !== 1) {
      throw new BadRequestException('HTML editing is supported only for email questions.');
    }

    const issues = htmlSyntaxIssues(html);
    if (issues.length) throw new BadRequestException({ message: 'Invalid HTML.', issues });
  }

  static sanitizeQuestionContent(html: string): string {
    if (!html) return '';
    return sanitizeHtml(html, {
      // TipTap-compatible tags
      allowedTags: [
        // Basic formatting
        'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        
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
        '*': ['class', 'id', 'style', 'dir']
      },
      
      allowedStyles: {
        '*': {
          'color': [/^(#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d.,%\s]+\))$/i],
          'font-family': [/^[a-z\d\s,"'-]+$/i],
          'font-size': [/^\d+(\.\d+)?(px|em|rem|%)$/],
          'font-weight': [/^(normal|bold|[1-9]00)$/],
          'font-style': [/^(normal|italic|oblique)$/],
          'line-height': [/^\d+(\.\d+)?(px|em|rem|%)?$/],
          'text-decoration': [/^(none|underline|line-through)$/],
          'text-align': [/^(left|right|center|justify)$/],
          'background-color': [/^(#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d.,%\s]+\))$/i],
          'width': [/^\d+px$/, /^\d+%$/, /^auto$/],
          'height': [/^\d+px$/, /^\d+%$/, /^auto$/],
          'min-width': [/^\d+px$/],
          'max-width': [/^\d+px$/, /^\d+%$/],
          'min-height': [/^\d+px$/],
          'border': [/^(0|none|\d+(\.\d+)?px (solid|dashed|dotted|double) (#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d.,%\s]+\)))$/i],
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

  static extractImageIds(html: string): string[] {
    const sanitizedContent = this.sanitizeQuestionContent(html);
    const $ = cheerio.load(sanitizedContent);
    const data = $.extract({
      imageIds: [
        {
          selector: 'img',
          value: 'data-image-id',
        }
      ],
    });

    return data.imageIds.filter((imageId): imageId is string => Boolean(imageId));
  }
}
