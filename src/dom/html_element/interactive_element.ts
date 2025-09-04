import type { ToString } from "#types/lang";
import { HTMLElementExtension } from "../html_extension";

// ---- //
// Type //
// ---- //

interface AnchorElementHackyDecorator<
	H extends typeof HTMLAnchorElementExtension = typeof HTMLAnchorElementExtension,
	I = HTMLAnchorElementExtension
>
{
	(...args: ConstructorParameters<H>): I;
	href(href: ToString): I;
	blank(href: ToString): I;
}

// -------------- //
// Implémentation //
// -------------- //

export class HTMLAnchorElementExtension extends HTMLElementExtension<"a">
{
	constructor(href: ToString, text: ToString = href)
	{
		super("a");

		this.attrs({ href: href.toString() }).text(text.toString());
	}

	download(filename?: ToString): this
	{
		return this.attr("download", filename?.toString() || "");
	}

	ping(urls: Array<ToString>): this
	{
		return this.attr("ping", urls.map((u) => u.toString()).join(" "));
	}

	rel(rels: Array<ToString>): this
	{
		return this.attr("rel", rels.map((r) => r.toString()).join(" "));
	}

	referrerPolicy(policy: ToString): this
	{
		return this.attr("referrerpolicy", policy.toString());
	}

	target(t: "_self" | "_blank" | "_parent" | "_top" | "_unfencedTop"): this
	{
		const that = this.attr("target", t);
		if (t === "_blank") {
			return that.rel([
				"noreferrer",
				"noopener",
			]);
		}
		return that;
	}

	text(content: ToString): this
	{
		return super.text(content, { replace: true });
	}
}

// -------- //
// Fonction //
// -------- //

function makeAnchorElementExtension(
	anchorExt: typeof HTMLAnchorElementExtension
): AnchorElementHackyDecorator
{
	// @ts-expect-error : to fixed
	let make = (...args: any) => new anchorExt(...args);

	for (const ty of ["href"] as const) {
		// @ts-expect-error : to fixed
		make[ty] = (...args: any) => make(...args);
	}

	// @ts-expect-error : to fixed
	make.blank = (...args: any) => make(...args).target("_blank");

	// @ts-expect-error : to fixed
	return make;
}

// ------ //
// Export //
// ------ //

export const a = makeAnchorElementExtension(HTMLAnchorElementExtension);
