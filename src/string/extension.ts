import type { Option } from "#root/safety/contract/option";
import { toOption } from "#root/safety/option";
import { trimEnd, trimStart } from "#root/string/trim";

type MatchGroupsOutput = Option<NonNullable<RegExpMatchArray["groups"]>>;

export class StringExtension
{
	#source: string;

	constructor(source: string)
	{
		this.#source = source;
	}

	/**
	 * Appends a given string onto the end of this String.
	 */
	push(str: string): StringExtension
	{
		return new StringExtension(
			this.#source + str
		);
	}

	/**
	 * Returns the values ​​corresponding to the capture groups in RegExp.
	 */
	matchGroups(matcher: Parameters<typeof String.prototype.match>[0]): MatchGroupsOutput
	{
		return toOption(this.#source.match(matcher)?.groups);
	}

	/**
	 * Returns a string with all suffixes that match a pattern repeatedly removed.
	 */
	trimEnd(suffixes: string | Array<string>): StringExtension
	{
		return new StringExtension(
			trimEnd(this.#source, suffixes)
		);
	}

	/**
	 * Returns a string slice with all prefixes that match a pattern repeatedly removed.
	 */
	trimStart(prefixes: string | Array<string>): StringExtension
	{
		return new StringExtension(
			trimStart(this.#source, prefixes)
		);
	}

	toString(): string
	{
		return this.#source;
	}
}
