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
	HTMLAbbrElementExtension,
	HTMLArticleElementExtension,
	HTMLAsideElementExtension,
	HTMLAudioElementExtension,
	HTMLEmElementExtension,
	HTMLHGroupElementExtension,
	HTMLStrongElementExtension,
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

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#embedded_content
export type EmbeddedContent = 
	| HTMLAudioElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#form-associated_content
export type FormAssociatedContent =
	| HTMLButtonElementExtension
	| HTMLInputElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#flow_content
export type FlowContent =
	| HTMLAnchorElementExtension
	| HTMLArticleElementExtension
	| HTMLAsideElementExtension
	| HTMLAudioElementExtension
	| HTMLBRElementExtension
	| HTMLButtonElementExtension
	| HTMLEmElementExtension
	| HTMLDivElementExtension
	| HTMLFormElementExtension
	| HTMLHeaderElementExtension
	| HTMLHGroupElementExtension
	| HTMLHRElementExtension
	| HTMLInputElementExtension
	| HTMLLabelElementExtension
	| HTMLLIElementExtension
	| HTMLNavElementExtension
	| HTMLSectionElementExtension
	| HTMLSpanElementExtension
	| HTMLStrongElementExtension
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
	| HTMLArticleElementExtension
	| HTMLAsideElementExtension
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
	| HTMLHGroupElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#palpable_content
export type PalpableContent =
	| HTMLAnchorElementExtension
	| HTMLButtonElementExtension
	| HTMLDivElementExtension
	| HTMLEmElementExtension
	| HTMLFormElementExtension
	| HTMLLabelElementExtension
	| HTMLNavElementExtension
	| HTMLSectionElementExtension
	| HTMLSpanElementExtension
	| HTMLStrongElementExtension
	;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#phrasing_content
export type PhrasingContent =
	| HTMLAbbrElementExtension
	| HTMLAudioElementExtension
	| HTMLBRElementExtension
	| HTMLButtonElementExtension
	| HTMLEmElementExtension
	| HTMLInputElementExtension
	| HTMLLabelElementExtension
	| HTMLSlotElementExtension
	| HTMLSpanElementExtension
	| HTMLStrongElementExtension
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
