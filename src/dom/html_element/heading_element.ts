import type { PhrasingContent } from "#types/html";
import { HTMLElementExtension, makeHTMLElementExtension } from "../html_extension";


abstract class HTMLHeadingElementExtension<
	T extends keyof HTMLElementTagNameMap
> extends HTMLElementExtension<T, PhrasingContent>
{
	constructor(level: 1 | 2 | 3 | 4 | 5 | 6, title: Parameters<HTMLElementExtension<T>["text"]>[0])
	{
		super(`h${level}` as unknown as T);

		this.text(title);
	}
}

export class HTMLHeadingLevel1ElementExtension extends HTMLHeadingElementExtension<"h1">
{
	constructor(title: Parameters<HTMLElementExtension<"h1">["text"]>[0])
	{
		super(1, title);
	}
}
export class HTMLHeadingLevel2ElementExtension extends HTMLHeadingElementExtension<"h2">
{
	constructor(title: Parameters<HTMLElementExtension<"h2">["text"]>[0])
	{
		super(2, title);
	}
}
export class HTMLHeadingLevel3ElementExtension extends HTMLHeadingElementExtension<"h3">
{
	constructor(title: Parameters<HTMLElementExtension<"h3">["text"]>[0])
	{
		super(3, title);
	}
}
export class HTMLHeadingLevel4ElementExtension extends HTMLHeadingElementExtension<"h4">
{
	constructor(title: Parameters<HTMLElementExtension<"h4">["text"]>[0])
	{
		super(4, title);
	}
}
export class HTMLHeadingLevel5ElementExtension extends HTMLHeadingElementExtension<"h5">
{
	constructor(title: Parameters<HTMLElementExtension<"h5">["text"]>[0])
	{
		super(5, title);
	}
}
export class HTMLHeadingLevel6ElementExtension extends HTMLHeadingElementExtension<"h6">
{
	constructor(title: Parameters<HTMLElementExtension<"h6">["text"]>[0])
	{
		super(6, title);
	}
}


export class HTMLHGroupElementExtension extends HTMLElementExtension<
	"hgroup",
	| HTMLParagraphElement
	| HTMLHeadingLevel1ElementExtension
	| HTMLHeadingLevel2ElementExtension
	| HTMLHeadingLevel3ElementExtension
	| HTMLHeadingLevel4ElementExtension
	| HTMLHeadingLevel5ElementExtension
	| HTMLHeadingLevel6ElementExtension
>
{
	constructor()
	{
		super("hgroup");
	}
}

export const h1 = makeHTMLElementExtension(HTMLHeadingLevel1ElementExtension, { decorate: false });
export const h2 = makeHTMLElementExtension(HTMLHeadingLevel2ElementExtension, { decorate: false });
export const h3 = makeHTMLElementExtension(HTMLHeadingLevel3ElementExtension, { decorate: false });
export const h4 = makeHTMLElementExtension(HTMLHeadingLevel4ElementExtension, { decorate: false });
export const h5 = makeHTMLElementExtension(HTMLHeadingLevel5ElementExtension, { decorate: false });
export const h6 = makeHTMLElementExtension(HTMLHeadingLevel6ElementExtension, { decorate: false });

export const hgroup = makeHTMLElementExtension(HTMLHGroupElementExtension);