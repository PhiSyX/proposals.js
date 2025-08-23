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
// Function //
// -------- //

function makeHTMLExtension<
	T extends keyof HTMLElementTagNameMap,
	H extends typeof HTMLElementExtension<T>,
>(
	htmlExt: H
): HTMLElementHackyDecorator<InstanceType<H>, T>
{
	// @ts-expect-error : to fixed
	const make: HTMLElementHackyDecorator<InstanceType<H>, T> =
		// @ts-expect-error : to fixed
		(...args: ConstructorParameters<H>) => new htmlExt(...args);

	// @ts-expect-error : to fixed
	make.attrs = (...args: any) => make().attrs(...args);
	// @ts-expect-error : to fixed
	make.id = (...args: any) => make().id(...args);
	// @ts-expect-error : to fixed
	make.class = (...args: any) => make().class(...args);
	// @ts-expect-error : to fixed
	make.text = (...args: any) => make().text(...args);

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
