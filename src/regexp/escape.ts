/**
 * RegExp Escaping Proposal
 *
 * @see https://github.com/tc39/proposal-regex-escaping
 */

/**
 * Les caractères spéciaux à échapper des RegExp
 */
const SPECIAL_CHARS = ["^", "$", ".", "*", "+", "?", "(", ")", "[", "]", "{","}", "|"] as const;
type RegExpSpecialChar = typeof SPECIAL_CHARS[number];

/**
 * Extension de la fonction RegExp.escape
 *
 * @example ```js
 * RegExpExt.escape("phisyx[away]"); 			 // 'phisyx\\[away\\]'
 * RegExpExt.escape("phisyx[away]", ["[", "]"]); // 'phisyx[away]'
 * ```
 */
export const escape = (str: string, excepts: Array<RegExpSpecialChar> = []) =>
{
	if (excepts.length === 0)
	{
		if ("escape" in RegExp && RegExp.escape instanceof Function)
		{
			return RegExp.escape(str);
		}
	}

	const filterChar = (w: RegExpSpecialChar) => !excepts.includes(w);
	const esc = (w: RegExpSpecialChar) => "\\" + w;
	const escaped = Array.from(SPECIAL_CHARS).filter(filterChar).map(esc).join("");
	const chars2escRE = new RegExp(`[${escaped}]`, "g");
	const checkCharsRE = new RegExp(chars2escRE.source, "g");

	return checkCharsRE.test(str) ? str.replace(chars2escRE, "\\$&") : str;
};
