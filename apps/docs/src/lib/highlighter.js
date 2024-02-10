import { codeToHtml } from 'shiki';

export async function highlighter(code, lang) {
	const html = await codeToHtml(code, {
		lang,
		theme: {
			dark: 'github-nord'
		}
	});

	console.log(html);

	return escapeHtml(html);
}

function escapeHtml(html) {
	return html.replace(/{/g, '&lbrace;').replace(/}/g, '&rbrace;').replace(/`/g, '&grave;');
}
