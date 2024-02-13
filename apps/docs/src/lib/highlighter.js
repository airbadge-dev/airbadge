import { createCssVariablesTheme } from 'shiki'
import { codeToHtml } from 'shiki/bundle/full'
import {
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from '@shikijs/transformers'
import { addCopyButton } from 'shiki-transformer-copy-button'

const theme = createCssVariablesTheme()

export async function highlighter(code, lang) {
  const html = await codeToHtml(code, {
    lang,
    theme,
    transformers: [
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      addCopyButton(code),
    ]
  })

  return escapeHtml(html)
}

function escapeHtml(html) {
  return html.replace(/{/g, '&lbrace;').replace(/}/g, '&rbrace;').replace(/`/g, '&grave;')
}
