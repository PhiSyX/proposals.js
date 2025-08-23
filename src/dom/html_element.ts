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
	constructor()
	{
		super("slot");
	}
}

// ------ //
// Export //
// ------ //

export const div = makeHTMLExtension(HTMLDivElementExtension);
export const slot = makeHTMLExtension(HTMLSlotElementExtension)
// ...
