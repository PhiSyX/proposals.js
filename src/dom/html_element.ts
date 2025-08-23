import { HTMLElementExtension, makeHTMLExtension } from "#root/dom/html_extension";

// --------------------- //
// HTMLElement Extension //
// --------------------- //

class HTMLBRElementExtension extends HTMLElementExtension<"br">
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

export const br = makeHTMLExtension(HTMLBRElementExtension);
export const tab = makeHTMLExtension(HTMLTabElementExtension);
export const div = makeHTMLExtension(HTMLDivElementExtension);
export const slot = makeHTMLExtension(HTMLSlotElementExtension);
export const span = makeHTMLExtension(HTMLSpanElementExtension);
// ...
