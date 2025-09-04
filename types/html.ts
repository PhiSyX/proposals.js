import type {
	HTMLDivElementExtension,
	HTMLHeaderElementExtension,
	HTMLLIElementExtension,
	HTMLUListElementExtension,
	HTMLButtonElementExtension,
	HTMLFormElementExtension,
	HTMLInputElementExtension,
	HTMLLabelElementExtension,
	HTMLHeadingLevel1ElementExtension,
	HTMLHeadingLevel2ElementExtension,
	HTMLHeadingLevel3ElementExtension,
	HTMLHeadingLevel4ElementExtension,
	HTMLHeadingLevel5ElementExtension,
	HTMLHeadingLevel6ElementExtension,
	HTMLAnchorElementExtension,
	HTMLSlotElementExtension,
	HTMLBRElementExtension,
	HTMLHRElementExtension,
	HTMLSpanElementExtension,
	HTMLNavElementExtension,
	HTMLSectionElementExtension,
} from "#root/dom/html_element";
import type { HTMLElementExtensionBase } from "#root/dom/html_extension";

import type { Computed } from "#root/signals/computed";
import type { State } from "#root/signals/state";
import type { FullPredicate, Primitive, ToString } from "#types/lang";

export type ClassName = ToString | ClassNameRecord;
export type ClassNameRecord = Record<string, FullPredicate>;

export type Listeners = keyof GlobalEventHandlersEventMap extends `${infer F}${infer R}`
	? `on${Uppercase<F>}${R}`
	: never;

export type ToEventName<L> = L extends `on${infer F}${infer R}`
	? `${Lowercase<F>}${R}`
	: never;

export type ToEvent<L> = ToEventName<L> extends infer EventName
	extends keyof GlobalEventHandlersEventMap
		? GlobalEventHandlersEventMap[EventName]
		: never;

export type HTMLFormElementMethod = HTMLFormMethodLower | HTMLFormMethodUpper;
type HTMLFormMethodLower = "get" | "post" | "patch" | "put" | "delete" ;
type HTMLFormMethodUpper = Uppercase<"get" | "post" | "patch" | "put" | "delete">;

export type HTMLInputElementType =
	| "checkbox" | "color"
	| "date" | "datetime" | "month" | "week"
	| "email"
	| "file"
	| "hidden"
	| "image"
	| "number"
	| "current-password" | "password"
	| "radio" | "range"
	| "search"
	| "tel" | "text" | "time"
	| "url";

export type HTMLButtonElementType = "submit" | "reset" | "button";

export type SubmitListener = (evt: SubmitEvent, data: Record<string, any>) => void;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#form-associated_content
export type FormAssociatedContent =
	| HTMLButtonElementExtension
	| HTMLInputElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#flow_content
export type FlowContent =
	| HTMLAnchorElementExtension
	| HTMLBRElementExtension
	| HTMLButtonElementExtension
	| HTMLDivElementExtension
	| HTMLFormElementExtension
	| HTMLHeaderElementExtension
	| HTMLHRElementExtension
	| HTMLInputElementExtension
	| HTMLLabelElementExtension
	| HTMLLIElementExtension
	| HTMLNavElementExtension
	| HTMLSectionElementExtension
	| HTMLSpanElementExtension
	| HTMLUListElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#interactive_content
export type InteractiveContent =
	| HTMLAnchorElementExtension
	| HTMLButtonElementExtension
	| HTMLLabelElementExtension
	| HTMLInputElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#sectioning_content
export type SectionContent =
	| HTMLNavElementExtension
	| HTMLSectionElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#heading_content
export type HeadingContent =
	| HTMLHeadingLevel1ElementExtension
	| HTMLHeadingLevel2ElementExtension
	| HTMLHeadingLevel3ElementExtension
	| HTMLHeadingLevel4ElementExtension
	| HTMLHeadingLevel5ElementExtension
	| HTMLHeadingLevel6ElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#palpable_content
export type PalpableContent =
	| HTMLAnchorElementExtension
	| HTMLButtonElementExtension
	| HTMLDivElementExtension
	| HTMLFormElementExtension
	| HTMLLabelElementExtension
	| HTMLNavElementExtension
	| HTMLSectionElementExtension
	| HTMLSpanElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#phrasing_content
export type PhrasingContent =
	| HTMLBRElementExtension
	| HTMLButtonElementExtension
	| HTMLInputElementExtension
	| HTMLLabelElementExtension
	| HTMLSlotElementExtension
	| HTMLSpanElementExtension
	;


export type Child =
	| Primitive
	| ToString
	| Date
	| State<any>
	| Computed<any>
	| HTMLElement
	| FlowContent
	| FormAssociatedContent
	| HeadingContent
	| InteractiveContent
	| PalpableContent
	| PhrasingContent
	| SectionContent
	| HTMLElementExtensionBase<keyof HTMLElementTagNameMap>
	| Promise<
		| FlowContent
		| FormAssociatedContent
		| HeadingContent
		| InteractiveContent
		| PalpableContent
		| PhrasingContent
		| SectionContent
		| HTMLElementExtensionBase<keyof HTMLElementTagNameMap>
	  >
	;
