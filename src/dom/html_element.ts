import { HTMLElementExtension, makeHTMLExtension } from "#root/dom/html_extension";

// --------------------- //
// HTMLElement Extension //
// --------------------- //

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

// ------ //
// Export //
// ------ //

export const div = makeHTMLExtension(HTMLDivElementExtension);
export const slot = makeHTMLExtension(HTMLSlotElementExtension);
// ...
