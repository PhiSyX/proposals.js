import { StringExtension } from "#root/string/extension";

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

type ToStringRaw = {
	toString(): string;
} & {};

type ToString = (string | StringExtension) & ToStringRaw;

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

	children(child: HTMLElement): this;
	children<E extends keyof HTMLElementTagNameMap>(child: HTMLElementExtension<E>): this
	children(...children: Array<HTMLElementExtension<keyof HTMLElementTagNameMap>>): this
	children(...children: Array<HTMLElement | HTMLElementExtension<keyof HTMLElementTagNameMap>>): this
	{
		this.#element.append(...children.map((c) => {
			if (c instanceof HTMLElement) return c;
			return c.render();
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
	// FIXME: use kebab case when set property name
	style<P extends keyof CSSStyleDeclaration>(prop: P, value: CSSStyleDeclaration[P]): this
	style(record: Partial<Record<keyof CSSStyleDeclaration, CSSStyleDeclaration[keyof CSSStyleDeclaration]>>): this
	style(propRecord: any, value?: any): this
	{
		if (isLiteralObject(propRecord)) {
			for (const [prop, val] of Object.entries(propRecord)) {
				this.#element.style.setProperty(prop.toString(), val!.toString());
			}
			return this;
		}

		this.#element.style.setProperty(propRecord.toString(), value!.toString());
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

export function makeHTMLExtension<
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
