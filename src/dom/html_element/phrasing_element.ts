import {
    HTMLElementExtension, HTMLVoidElementExtension,
    makeHTMLElementExtension, makeHTMLVoidElementExtension
} from "#root/dom/html_extension";
import type { PhrasingContent } from "#types/html";
import type { ToString } from "#types/lang";

export class HTMLBRElementExtension extends HTMLVoidElementExtension<"br">
{
    constructor()
    {
        super("br");
    }
}

export class HTMLHRElementExtension extends HTMLVoidElementExtension<"hr">
{
    constructor()
    {
        super("hr");
    }

    text(text: ToString): this
    {
        return this.dataset({ text: text.toString() });
    }
}

export class HTMLTabElementExtension extends HTMLElementExtension<"span", PhrasingContent>
{
    constructor(indentSize: number = 4)
    {
        super("span");

        this.style("whiteSpace", "break-spaces").text(' '.repeat(indentSize));
    }

    indentSize(indentSize: number): this
    {
        return this.text(' '.repeat(indentSize), { replace: true });
    }
}

export class HTMLSpanElementExtension extends HTMLElementExtension<"span", PhrasingContent>
{
    constructor()
    {
        super("span");
    }
}

export class HTMLSlotElementExtension extends HTMLElementExtension<"slot">
{
	constructor(name?: string)
	{
		super("slot");

		if (name) {
			this.named(name);
		}
	}

	named(name: string): this
	{
		this.el().setAttribute("name", name);
		return this;
	}
}

export const br = makeHTMLVoidElementExtension(HTMLBRElementExtension);
export const hr = makeHTMLVoidElementExtension(HTMLHRElementExtension);
export const tab = makeHTMLElementExtension(HTMLTabElementExtension, { decorate: false });
export const slot = makeHTMLElementExtension(HTMLSlotElementExtension);
export const span = makeHTMLElementExtension(HTMLSpanElementExtension);
