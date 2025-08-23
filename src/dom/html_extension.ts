import { StringExtension } from "#root/string/extension";

// ---- //
// Type //
// ---- //

interface HTMLElementHackyDecorator<
	H extends abstract new (...args: any) => HTMLElementExtension<T>,
	T extends keyof HTMLElementTagNameMap,
	I extends InstanceType<H> = InstanceType<H>
>
{
	(...args: ConstructorParameters<H>): I;
	attrs(...args: Parameters<I["attrs"]>): I;
	id(...args: Parameters<I["id"]>): I;
	class(...args: Parameters<I["class"]>): I;
	text(...args: Parameters<I["text"]>): I;
}

type ToStringRaw = {
	toString(): string;
} & {};

type ToString = (string | StringExtension) & ToStringRaw;
type Primitive = string | number | bigint | boolean;
type Children = Primitive | Date | HTMLElement | HTMLElementExtension<keyof HTMLElementTagNameMap>;
type FullPredicate = boolean | (() => boolean);
type ClassName = ToString | ClassNameRecord;
type ClassNameRecord = Record<string, FullPredicate>;

// -------------- //
// Implémentation //
// -------------- //

export class HTMLElementExtension<T extends keyof HTMLElementTagNameMap>
{
    #element: HTMLElementTagNameMap[T];

    constructor(tagName: T)
    {
        this.#element = document.createElement(tagName);
    }

    el(): HTMLElementTagNameMap[T]
    {
        return this.#element;
    }

	// ------- //
	// Methods //
	// ------- //

	attr(name: string, value: ToStringRaw): this
	{
		this.#element.setAttribute(
			// TODO: kebab case
			name,
			value.toString(),
		);
		return this;
	}

	attrs(attributes: Record<string, ToStringRaw>): this
	{
		for (const [attrName, attrValue] of Object.entries(attributes)) {
			this.attr(attrName, attrValue);
		}
		return this;
	}

	class(cls: ClassName): this
	{
		if (typeof cls === "string" || cls instanceof StringExtension) {
			this.#element.classList.add(cls.toString());
			return this;
		}

		const truthy = ([_, predicate]: [cls: string, FullPredicate]) => {
			if (typeof predicate === "boolean") return predicate;
			return predicate();
		};

		const classes = Object.entries(cls).filter(truthy).map(([cls]) => cls);
		this.#element.classList.add(...classes);

		return this;
	}

	children(...children: Array<Children>): this
	{
		this.#element.append(...children.flatMap((child) => {
			if (isPrimitive(child)) {
				return renderPrimitive(child);
			}

			if (child instanceof HTMLElement) {
				return child;
			}

			if (child instanceof Date) {
				return child.toISOString();
			}

			return child.render();
		}));
		return this;
	}

	dataset(dataset: Record<string, ToStringRaw>): this
	{
		for (const [name, data] of Object.entries(dataset)) {
			this.#element.dataset[name] = data.toString();
		}
		return this;
	}

	id(id: ToString): this
	{
		this.#element.setAttribute("id", id.toString());
		return this;
	}

	querySelector<E extends keyof HTMLElementTagNameMap>(selector: E): HTMLElementTagNameMap[E] | null
	querySelector<E extends HTMLElement = HTMLElement>(selector: string): E | null
	{
		return this.#element.querySelector<E>(selector);
	}

	on<E extends keyof HTMLElementEventMap>(
		evtName: E,
		listener: (ev: HTMLElementEventMap[E]) => any,
		options?: AddEventListenerOptions
	): this
	{
		this.#element.addEventListener(
			evtName,
			// @ts-expect-error
			listener.bind(this),
			options,
		);
		return this;
	}

	once<E extends keyof HTMLElementEventMap>(
		evtName: E,
		listener: (ev: HTMLElementEventMap[E]) => any,
		options: Omit<AddEventListenerOptions, "once"> = {}
	): this
	{
		(options as AddEventListenerOptions).once ||= true;
		this.on(evtName, listener, options);
		return this;
	}

	// FIXME: use better types
	style<P extends keyof CSSStyleDeclaration>(prop: P, value: CSSStyleDeclaration[P]): this
	style(record: Partial<Record<keyof CSSStyleDeclaration, CSSStyleDeclaration[keyof CSSStyleDeclaration]>>): this
	style(propRecord: any, value?: any): this
	{
		// TODO: use a better impl of kebab case
		//       move to StringExtension.
		const toKebabCase = (str: string) => {
			return str.replaceAll(/([A-Z])/g, (_, $1) => `-${$1.toLowerCase()}`);
		};

		if (isLiteralObject(propRecord)) {
			for (const [prop, val] of Object.entries(propRecord)) {
				this.#element.style.setProperty(toKebabCase(prop.toString()), val!.toString());
			}
			return this;
		}

		this.#element.style.setProperty(toKebabCase(propRecord.toString()), value!.toString());
		return this;
	}

	text(content: ToString, options?: { replace?: boolean }): this
	{
		if (options?.replace) {
			this.#element.textContent = content.toString();
		} else {
			this.#element.append(content.toString());
		}
		return this;
	}

	render()
	{
		return this.el();
	}
}

// -------- //
// Fonction //
// -------- //

function isLiteralObject(value: unknown): value is object
{
	return value != null && typeof value === "object" &&
		value.constructor?.name === "Object";
}

function isPrimitive(value: unknown): value is Primitive
{
	switch (typeof value) {
		case "bigint":
		case "number":
		case "string":
		case "boolean":
			return true;
	}
	return false;
}

function renderPrimitive(value: Primitive): Array<string | HTMLElement>| string | HTMLElement
{
	if (typeof value === "boolean") {
		return value ? "true" : "false";
	}

	if (typeof value === "string") {
		return value.split(/([\n\t])/g).map((str) => {
			switch (str) {
				case "\n":
					return document.createElement("br");
				case "\t":
				{
					const $span = document.createElement("span");
					$span.style.whiteSpace = "break-spaces";
					$span.append(' '.repeat(4));
					return $span;
				};
			}

			return str;
		});
	}

	return value.toString();
}

export function makeHTMLExtension<
	H extends new (...args: any) => HTMLElementExtension<T>,
	T extends keyof HTMLElementTagNameMap,
>(
	htmlExt: H
): HTMLElementHackyDecorator<H, T>
{
	// @ts-expect-error : to fixed
	const make: HTMLElementHackyDecorator<H, T> =
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
