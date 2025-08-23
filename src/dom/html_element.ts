import { HTMLElementExtension } from "#root/dom/html_extension";

// ---- //
// Type //
// ---- //

interface HTMLElementHackyDecorator<
	T extends HTMLElementExtension<K>,
	K extends keyof HTMLElementTagNameMap
>
{
	(...args: any): T;
	attrs(...args: Parameters<T["attrs"]>): T;
	id(...args: Parameters<T["id"]>): T;
	class(...args: Parameters<T["class"]>): T;
	text(...args: Parameters<T["text"]>): T;
}

// -------- //
// Fonction //
// -------- //

function makeHTMLExtension<
	T extends keyof HTMLElementTagNameMap,
	H extends typeof HTMLElementExtension<T>,
>(
	htmlExt: H
): HTMLElementHackyDecorator<InstanceType<H>, T>
{
	// @ts-expect-error :-)
	const make: HTMLElementHackyDecorator<InstanceType<H>, T> =
		// @ts-expect-error :-)
		(...args: ConstructorParameters<H>) => new htmlExt(...args);

	make.attrs = (...args: any) => make.attrs(...args);
	make.id = (...args: any) => make.id(...args);
	make.class = (...args: any) => make.class(...args);
	make.text = (...args: any) => make.text(...args);

	return make;
}

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

// ------ //
// Export //
// ------ //

export const div = makeHTMLExtension(HTMLDivElementExtension);
// ...
