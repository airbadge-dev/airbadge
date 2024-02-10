import { codeToHtml } from 'shiki/bundle/full'

export async function highlighter(code, lang) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      dark: 'github-dark',
      light: 'github-light'
    }
  })

  return escapeHtml(html)
}

function escapeHtml(html) {
  return html.replace(/{/g, '&lbrace;').replace(/}/g, '&rbrace;').replace(/`/g, '&grave;')
}
