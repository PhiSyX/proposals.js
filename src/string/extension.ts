import type { Option } from "#root/safety/contract/option";
import { toOption } from "#root/safety/option";
import { trimEnd, trimStart } from "#root/string/trim";

// ---- //
// Type //
// ---- //

type MatchGroupsOutput = Option<NonNullable<RegExpMatchArray["groups"]>>;

// -------------- //
// Implémentation //
// -------------- //

export class StringExtension
{
	#source: string = "";

	constructor(source: string = "")
	{
		this.#source = source;
	}

	inner(): string 
	{
		return this.#source;
	}

	toString(): string
	{
		return this.#source;
	}

	// ------- //
	// Methods //
	// ------- //

	/**
	 * Appends a given string onto the end of this String.
	 */
	push(arr: Array<string>): StringExtension;
	push(str: string): StringExtension;
	push(value: string | Array<string>): StringExtension
	{
		const str = Array.isArray(value) ? value.join("") : value;
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
	trimEnd(suffixes?: Parameters<typeof trimEnd>[1]): StringExtension
	{
		return new StringExtension(
			trimEnd(this.#source, suffixes)
		);
	}

	/**
	 * Returns a string slice with all prefixes that match a pattern repeatedly removed.
	 */
	trimStart(prefixes: Parameters<typeof trimStart>[1]): StringExtension
	{
		return new StringExtension(
			trimStart(this.#source, prefixes)
		);
	}
}
