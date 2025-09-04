import type { Child } from "#types/html";
import { HTMLElementExtension, makeHTMLElementExtension } from "../html_extension";

export class HTMLDivElementExtension extends HTMLElementExtension<"div">
{
    constructor()
    {
        super("div");
    }
}

export class HTMLSectionElementExtension extends HTMLElementExtension<"section">
{
    constructor()
    {
        super("section");
    }
}

export class HTMLHeaderElementExtension extends HTMLElementExtension<"header">
{
    constructor()
    {
        super("header");
    }
}

export class HTMLNavElementExtension extends HTMLElementExtension<"nav">
{
    constructor()
    {
        super("nav");
    }
}

export class HTMLUListElementExtension extends HTMLElementExtension<"ul">
{
    constructor(children: Array<Child> = [])
    {
        super("ul");

		for (const child of children) {
			this.li(child);
		}
    }

	li(child: Child): this
	{
		if (child instanceof HTMLLIElementExtension) {
			return this.children(child);
		}
		return this.children(li.children(child));
	}
}

export class HTMLLIElementExtension extends HTMLElementExtension<"li">
{
    constructor()
    {
        super("li");
    }
}

export const div = makeHTMLElementExtension(HTMLDivElementExtension);
export const section = makeHTMLElementExtension(HTMLSectionElementExtension);
export const header = makeHTMLElementExtension(HTMLHeaderElementExtension);
export const nav = makeHTMLElementExtension(HTMLNavElementExtension);
export const ul = makeHTMLElementExtension(HTMLUListElementExtension)
export const li = makeHTMLElementExtension(HTMLLIElementExtension)
