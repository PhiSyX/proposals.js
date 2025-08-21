/**
 * String.prototype.trimStart / String.prototype.trimEnd
 *
 * @see https://github.com/tc39/proposal-string-left-right-trim
 */

import { escape } from "#root/regexp/escape";

/**
 * Extension de la fonction `trimEnd`
 */
export const trimEnd = (str: string, patterns?: string | Array<string>) =>
{
	if (patterns !== undefined && patterns.length !== 0)
	{
		const pt = typeof patterns === "string" ? patterns : patterns.join("");
		const lastRE = new RegExp(`[${escape(pt)}]+$`, "g");
		return str.replaceAll(lastRE, "");
	}
	return str.trimEnd();
};

/**
 * Extension de la fonction `trimStart`
 */
export const trimStart = (str: string, patterns?: string | Array<string>) =>
{
	if (patterns !== undefined && patterns.length !== 0)
	{
		const pt = typeof patterns === "string" ? patterns : patterns.join("");
		const lastRE = new RegExp(`^[${escape(pt)}]+`, "g");
		return str.replaceAll(lastRE, "");
	}
	return str.trimStart();
};
