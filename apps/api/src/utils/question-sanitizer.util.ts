import * as sanitizeHtml from 'sanitize-html';
import * as cheerio from 'cheerio';
import { BadRequestException } from '@nestjs/common';
import { htmlSyntaxIssues } from './advanced-html.util';

const SAFE_COLOR = /^(transparent|#[0-9a-f]{3,8}|rgba?\([^)]+\)|[a-z]+)$/i;
const SAFE_LENGTH = /^(0|auto|inherit|\d+(\.\d+)?(px|em|rem|%))$/i;
const SAFE_SPACING = /^(0|\d+(\.\d+)?(px|em|rem|%))(\s+(0|\d+(\.\d+)?(px|em|rem|%))){0,3}$/i;
const SAFE_FONT_FAMILY = /^[\w\s"',.-]+$/i;
const SAFE_FONT_WEIGHT = /^(normal|bold|[1-9]00)$/i;
const SAFE_LINE_HEIGHT = /^(normal|\d+(\.\d+)?(%|px|em|rem)?)$/i;
const SAFE_TEXT_ALIGN = /^(left|right|center|justify|-webkit-center)$/i;
const SAFE_TEXT_DECORATION = /^(none|underline|line-through)$/i;
const SAFE_BORDER = /^(0|none|\d+(\.\d+)?px\s+(solid|dashed|dotted)\s+.+)$/i;

const EMAIL_ALLOWED_STYLES = {
  '*': {
    'background-color': [SAFE_COLOR],
    border: [SAFE_BORDER],
    'border-radius': [SAFE_LENGTH],
    'border-spacing': [SAFE_LENGTH],
    'border-style': [/^(none|solid|dashed|dotted)$/i],
    color: [SAFE_COLOR],
    display: [/^(none|block|inline|inline-block|table|table-row|table-cell)$/i],
    'font-family': [SAFE_FONT_FAMILY],
    'font-size': [SAFE_LENGTH],
    'font-weight': [SAFE_FONT_WEIGHT],
    height: [SAFE_LENGTH],
    'line-height': [SAFE_LINE_HEIGHT],
    margin: [SAFE_SPACING],
    'max-height': [SAFE_LENGTH],
    'max-width': [SAFE_LENGTH],
    'min-height': [SAFE_LENGTH],
    'min-width': [SAFE_LENGTH],
    opacity: [/^(0(\.\d+)?|1(\.0+)?)$/],
    overflow: [/^(visible|hidden|auto)$/i],
    padding: [SAFE_SPACING],
    'table-layout': [/^(auto|fixed)$/i],
    'text-align': [SAFE_TEXT_ALIGN],
    'text-decoration': [SAFE_TEXT_DECORATION],
    width: [SAFE_LENGTH],
    'word-break': [/^(normal|break-all|break-word)$/i],
    'word-wrap': [/^(normal|break-word)$/i],
  },
};

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
      
      allowedStyles: EMAIL_ALLOWED_STYLES,
      
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
