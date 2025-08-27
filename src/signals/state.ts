import { Watcher, type WatcherCallback, type WatcherOptions } from "#root/signals/watcher";
import { Computed, type ComputedCallback } from "#root/signals/computed";

export class State<T>
{
    #data: T;
	#watchers: Array<Watcher<T>> = [];

	constructor(data: T)
	{
		this.#data = data;
	}

	get value(): Readonly<T>
	{
		return Object.freeze(this.#data);
	}

	replace(
		value:
			| ((curValue: T) => T)
			| T 
	): Readonly<T>
	{
		let old = this.value;

		if (value instanceof Function) {
			this.#data = value(old);
		} else {
			this.#data = value;
		}

		this.#applyWatchers(old);
		return old;
	}

	computed(callback: ComputedCallback<T>)
	{
		return new Computed(this, callback);
	}

	watch(
		callback: WatcherCallback<T>,
		options?: WatcherOptions,
	)
	{
		this.#watchers.push(new Watcher(callback, options));
	}

	#applyWatchers(old: T)
	{
		for (const watcher of this.#watchers) {
			watcher.call(old, this.value);
		}
	}
}