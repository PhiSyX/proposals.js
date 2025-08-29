import type { HTMLElementExtensionBase } from "#root/dom/html_extension";
import type { Computed } from "#root/signals/computed";
import type { State } from "#root/signals/state";
import type { FullPredicate, Primitive, ToString } from "#types/lang";

export type Child =
	| Primitive
	| ToString
	| Date
	| State<any>
	| Computed<any>
	| HTMLElement
	| HTMLElementExtensionBase<keyof HTMLElementTagNameMap>
	| Promise<HTMLElementExtensionBase<keyof HTMLElementTagNameMap>>
	;

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
