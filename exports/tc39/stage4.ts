import { escape } from "#root/regexp/escape";
import { trimEnd, trimStart } from "#root/string/trim";

export class RegExpExtension
{
	static escape = escape;
}

export class StringExtension
{
	static trimEnd = trimEnd;
	static trimStart = trimStart;
}
