import { createCssVariablesTheme } from 'shiki'
import { codeToHtml } from 'shiki/bundle/full'
import {
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerMetaHighlight,
  transformerMetaWordHighlight
} from '@shikijs/transformers'
import { addCopyButton } from 'shiki-transformer-copy-button'

const theme = createCssVariablesTheme()

export async function highlighter(code, lang, meta = '') {
  const html = await codeToHtml(code, {
    lang,
    theme,
    meta: {
      __raw: meta
    },
    transformers: [
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
      addCopyButton(code)
    ]
  })

  return escapeHtml(html)
}

function escapeHtml(html) {
  return html.replace(/{/g, '&lbrace;').replace(/}/g, '&rbrace;').replace(/`/g, '&grave;')
}
