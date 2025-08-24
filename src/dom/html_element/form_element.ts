import type { HTMLElementExtensionBase } from "#root/dom/html_extension";
import type { Option } from "#root/safety/contract/option";
import type { 
	HTMLButtonElementType, HTMLFormElementMethod, HTMLInputElementType,
	Listeners, SubmitListener, ToEvent,
} from "#types/html";
import type { ToString } from "#types/lang";

import {
	HTMLElementExtension, HTMLVoidElementExtension,
	makeHTMLElementExtension,
} from "#root/dom/html_extension";
import { None } from "#root/safety/option";

// ---- //
// Type //
// ---- //

type HTMLFormInputComponentEvents =
{
	[L in Listeners]?: (evt: ToEvent<L>) => void;
};

type FormElementParams = [action: ToString];

interface FormElementHackyDecorator<
	H extends typeof HTMLFormElementExtension = typeof HTMLFormElementExtension,
	I = HTMLFormElementExtension
>
{
	(...args: ConstructorParameters<H>): I;
	get(...args: FormElementParams): I;
	delete(...args: FormElementParams): I;
	patch(...args: FormElementParams): I;
	put(...args: FormElementParams): I;
	post(...args: FormElementParams): I;
}

type FormInputElementParams = [name: ToString, defaultValue?: ToString];

interface FormInputElementHackyDecorator<
	H extends typeof HTMLInputElementExtension = typeof HTMLInputElementExtension,
	I = HTMLInputElementExtension
>
{
	(...args: ConstructorParameters<H>): I;
	checkbox(...args: FormInputElementParams): I;
	color(...args: FormInputElementParams): I;
	date(...args: FormInputElementParams): I;
	datetime(...args: FormInputElementParams): I;
	month(...args: FormInputElementParams): I;
	week(...args: FormInputElementParams): I;
	email(...args: FormInputElementParams): I;
	file(...args: FormInputElementParams): I;
	hidden(...args: FormInputElementParams): I;
	image(...args: FormInputElementParams): I;
	number(...args: FormInputElementParams): I;
	password(...args: FormInputElementParams): I;
	radio(...args: FormInputElementParams): I;
	range(...args: FormInputElementParams): I;
	search(...args: FormInputElementParams): I;
	tel(...args: FormInputElementParams): I;
	text(...args: FormInputElementParams): I;
	time(...args: FormInputElementParams): I;
	number(...args: FormInputElementParams): I;
	url(...args: FormInputElementParams): I;
}

type FormButtonElementParams = [];

interface FormButtonElementHackyDecorator<
	H extends typeof HTMLButtonElementExtension = typeof HTMLButtonElementExtension,
	I = HTMLButtonElementExtension
>
{
	(...args: ConstructorParameters<H>): I;
	reset(...args: FormButtonElementParams): I;
	submit(...args: FormButtonElementParams): I;
}

// -------------- //
// Implémentation //
// -------------- //

export abstract class HTMLFormInputComponentContract
{
	#relatedForm: Option<HTMLFormElementExtension> = None();

	setRelatedForm(form: HTMLFormElementExtension)
	{
		this.#relatedForm.replace(form);
	}

	get relatedForm()
	{
		return this.#relatedForm.expect("The related form");
	}

	get maybeRelatedForm()
	{
		return this.#relatedForm;
	}

	abstract render(): HTMLElementExtensionBase<keyof HTMLElementTagNameMap>;
}

class HTMLFormElementExtension extends HTMLElementExtension<"form">
{
	constructor(method: HTMLFormElementMethod, action: ToString)
	{
		super("form");

		this.attrs({ action, method });
	}

	// TODO: use an event to notify the current element that the component
	// has been added.
	input(
		component:
			| HTMLFormInputComponentContract
			& HTMLFormInputComponentEvents
	): this
	{
		component.setRelatedForm(this);

		const el = component.render();
		this.el().append(el.render());

		const events = Object.entries(component).filter(
			([n]) => n.startsWith("on") && n?.[2] === n?.[2]?.toUpperCase()
		);

		for (const [name, listener] of events) {
			// @ts-expect-error
			el.on(name.slice(2).toLowerCase(), listener.bind(component));
		}

		return this;
	}

	submit(
		component:
			| HTMLButtonElementExtension,
		listener?:
			| SubmitListener,
		options:
			| { forceType?: boolean }
			= { forceType: false }
	): this
	{
		const onSubmit = (handler: SubmitListener) => {
			this.el().addEventListener("submit", (evt) => {
				evt.preventDefault();
				const form = new FormData(this.el());
				handler(evt, Object.fromEntries(form.entries()));
			});
		};

		let buttonExt = component;

		if (options.forceType) {
			buttonExt.type("submit");
		}

		if (listener) onSubmit(listener);
		this.el().append(buttonExt.render());

		return this;
	}
}

class HTMLInputElementExtension extends HTMLVoidElementExtension<"input">
{
	constructor(name: ToString, type?: HTMLInputElementType, defaultValue?: ToString)
	{
		super("input");
		this.attr("type", type || "text");
		this.attr("name", name);
		this.attr("value", defaultValue || "");
	}
}

class HTMLLabelElementExtension extends HTMLElementExtension<"label">
{
	constructor(label: ToString)
	{
		super("label");
		this.text(label);
	}

	for(inputAreaId: ToString): this
	{
		return this.attr("for", inputAreaId);
	}
}

class HTMLButtonElementExtension extends HTMLElementExtension<"button">
{
	constructor(type: HTMLButtonElementType = "button")
	{
		super("button");

		this.type(type);
	}

	type(type: HTMLButtonElementType): this
	{
		return this.attr("type", type);
	}
}

// -------- //
// Fonction //
// -------- //

function makeFormElementExtension(
	formExt: typeof HTMLFormElementExtension
): FormElementHackyDecorator
{
	// @ts-expect-error : to fixed
	let make = (...args: any) => new formExt(...args);

	for (const ty of ["get", "delete", "patch", "put", "post"] as const) {
		// @ts-expect-error : to fixed
		make[ty] = (...args: any) => make(ty, ...args);
	}

	// @ts-expect-error : to fixed
	return make;
}

function makeFormInputElementExtension(
	inputExt: typeof HTMLInputElementExtension
): FormInputElementHackyDecorator
{
	// @ts-expect-error : to fixed
	let make = (...args: any) => new inputExt(...args);

	for (const ty of [
		"checkbox", "color",
		"date", "datetime", "month", "week",
		"email",
		"file",
		"hidden",
		"image",
		"number",
		"password",
		"radio", "range",
		"search",
		"tel", "text", "time",
		"url",
	] as const) {
		// @ts-expect-error
		make[ty] = (...args: any) => {
			const [a, ...c] = args;
			return make(a, ty, ...c);
		};
	}

	// @ts-expect-error : to fixed
	return make;
}

function makeFormButtonElementExtension(
	buttonExt: typeof HTMLButtonElementExtension
): FormButtonElementHackyDecorator
{
	let make = (...args: any) => new buttonExt(...args);

	for (const ty of ["submit", "reset"] as const) {
		// @ts-expect-error
		make[ty] = (...args: any) => make(ty, ...args);
	}

	// @ts-expect-error : to fixed
	return make;
}

// ------ //
// Export //
// ------ //

export const form = makeFormElementExtension(HTMLFormElementExtension);
export const input = makeFormInputElementExtension(HTMLInputElementExtension);
export const label = makeHTMLElementExtension(HTMLLabelElementExtension, { decorate: false });
export const button = makeFormButtonElementExtension(HTMLButtonElementExtension);
