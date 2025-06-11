import StarterKit from '@tiptap/starter-kit'
import Blockquote from '@tiptap/extension-blockquote'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import OrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import ListKeymap from '@tiptap/extension-list-keymap'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import Link from '@tiptap/extension-link'
import { Explanation } from '../extensions/Explanation'
import { SearchNReplace } from '../extensions/Search'
import { ImageWithExplanation } from '../extensions/ImageWithExplanation'

export const getEditorExtensions = () => [
  StarterKit,
  Blockquote,
  HorizontalRule,
  OrderedList,
  Underline,
  TextStyle,
  Color,
  Dropcursor,
  Gapcursor,
  ListKeymap,
  Typography,
  Placeholder.configure({        
    placeholder: 'Write something …',
  }),
  Explanation,
  SearchNReplace,
  Link.configure({
    openOnClick: false,
  }),
  ImageWithExplanation.configure({
    inline: false,
    allowBase64: true
  })
]