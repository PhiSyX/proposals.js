import type { FlowContent } from "#types/html";
import { HTMLElementExtension, makeHTMLElementExtension } from "../html_extension";

export class HTMLDivElementExtension extends HTMLElementExtension<"div", FlowContent>
{
    constructor()
    {
        super("div");
    }
}

export class HTMLHeaderElementExtension extends HTMLElementExtension<"header", FlowContent>
{
    constructor()
    {
        super("header");
    }
}

export class HTMLUListElementExtension extends HTMLElementExtension<"ul", HTMLLIElementExtension>
{
    constructor(listItemChildren: Array<FlowContent> = [])
    {
        super("ul");

		for (const child of listItemChildren) {
			this.li(child);
		}
    }

	li(child: FlowContent): this
	{
		if (child instanceof HTMLLIElementExtension) {
			return this.children(child);
		}
		return this.children(li.children(child));
	}
}

export class HTMLLIElementExtension extends HTMLElementExtension<"li", FlowContent>
{
    constructor()
    {
        super("li");
    }
}

export const div = makeHTMLElementExtension(HTMLDivElementExtension);
export const header = makeHTMLElementExtension(HTMLHeaderElementExtension);
export const ul = makeHTMLElementExtension(HTMLUListElementExtension)
export const li = makeHTMLElementExtension(HTMLLIElementExtension)
