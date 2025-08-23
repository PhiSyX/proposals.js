import { HTMLElementExtension, HTMLVoidElementExtension, makeHTMLElementExtension, makeHTMLVoidElementExtension } from "#root/dom/html_extension";

// --------------------- //
// HTMLElement Extension //
// --------------------- //

class HTMLBRElementExtension extends HTMLVoidElementExtension<"br">
{
    constructor()
    {
        super("br");
    }
}

class HTMLTabElementExtension extends HTMLElementExtension<"span">
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

class HTMLDivElementExtension extends HTMLElementExtension<"div">
{
    constructor()
    {
        super("div");
    }
}

class HTMLSlotElementExtension extends HTMLElementExtension<"slot">
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

class HTMLSpanElementExtension extends HTMLElementExtension<"span">
{
    constructor()
    {
        super("span");
    }
}

// ------ //
// Export //
// ------ //

export const br = makeHTMLVoidElementExtension(HTMLBRElementExtension);
export const tab = makeHTMLElementExtension(HTMLTabElementExtension);
export const div = makeHTMLElementExtension(HTMLDivElementExtension);
export const slot = makeHTMLElementExtension(HTMLSlotElementExtension);
export const span = makeHTMLElementExtension(HTMLSpanElementExtension);
// ...
