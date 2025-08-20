import { trimEnd } from "#root/string/trim";

export class StringExtension
{
	#source: string;

	constructor(source: string)
	{
		this.#source = source;
	}

	push(str: string): StringExtension
	{
		return new StringExtension(
			this.#source + str
		);
	}
	trimEnd(patterns: string | Array<string>): StringExtension
	{
		return new StringExtension(
			trimEnd(this.#source, patterns)
		);
	}

	toString(): string
	{
		return this.#source;
	}
}
