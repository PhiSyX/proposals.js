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

class HTMLSectionElementExtension extends HTMLElementExtension<"section">
{
	constructor()
	{
		super("section");
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

abstract class HTMLHeadingElementExtension<T extends keyof HTMLElementTagNameMap> extends HTMLElementExtension<T> {
	constructor(level: 1 | 2 | 3 | 4 | 5 | 6, title: Parameters<HTMLElementExtension<T>["text"]>[0])
	{
		super(`h${level}` as unknown as T);

		this.text(title);
	}
}

class HTMLHeadingLevel1ElementExtension extends HTMLHeadingElementExtension<"h1">
{
	constructor(title: Parameters<HTMLElementExtension<"h1">["text"]>[0])
	{
		super(1, title);
	}
}
class HTMLHeadingLevel2ElementExtension extends HTMLHeadingElementExtension<"h2">
{
	constructor(title: Parameters<HTMLElementExtension<"h2">["text"]>[0])
	{
		super(2, title);
	}
}
class HTMLHeadingLevel3ElementExtension extends HTMLHeadingElementExtension<"h3">
{
	constructor(title: Parameters<HTMLElementExtension<"h3">["text"]>[0])
	{
		super(3, title);
	}
}
class HTMLHeadingLevel4ElementExtension extends HTMLHeadingElementExtension<"h4">
{
	constructor(title: Parameters<HTMLElementExtension<"h4">["text"]>[0])
	{
		super(4, title);
	}
}
class HTMLHeadingLevel5ElementExtension extends HTMLHeadingElementExtension<"h5">
{
	constructor(title: Parameters<HTMLElementExtension<"h5">["text"]>[0])
	{
		super(5, title);
	}
}
class HTMLHeadingLevel6ElementExtension extends HTMLHeadingElementExtension<"h6">
{
	constructor(title: Parameters<HTMLElementExtension<"h6">["text"]>[0])
	{
		super(6, title);
	}
}

// ------ //
// Export //
// ------ //

export const br = makeHTMLVoidElementExtension(HTMLBRElementExtension);
export const tab = makeHTMLElementExtension(HTMLTabElementExtension, { decorate: false });

export const div = makeHTMLElementExtension(HTMLDivElementExtension);
export const section = makeHTMLElementExtension(HTMLSectionElementExtension);
export const slot = makeHTMLElementExtension(HTMLSlotElementExtension);
export const span = makeHTMLElementExtension(HTMLSpanElementExtension);

export const h1 = makeHTMLElementExtension(HTMLHeadingLevel1ElementExtension, { decorate: false });
export const h2 = makeHTMLElementExtension(HTMLHeadingLevel2ElementExtension, { decorate: false });
export const h3 = makeHTMLElementExtension(HTMLHeadingLevel3ElementExtension, { decorate: false });
export const h4 = makeHTMLElementExtension(HTMLHeadingLevel4ElementExtension, { decorate: false });
export const h5 = makeHTMLElementExtension(HTMLHeadingLevel5ElementExtension, { decorate: false });
export const h6 = makeHTMLElementExtension(HTMLHeadingLevel6ElementExtension, { decorate: false });

export {
	button, form, input, label,
	HTMLFormInputComponentContract,
} from "#root/dom/html_element/form_element";
