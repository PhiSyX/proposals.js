import type { State } from "#root/signals/state";

export type ComputedCallback<T> = (curValue: T) => any;

export class Computed<T = unknown>
{
    #state: State<T>;
	#output: (curValue: T) => any;

	constructor(
		state: State<T>,
		callback: ComputedCallback<T>,
	)
	{
		this.#state = state;
		this.#output = callback;
	}

	get value()
	{
		return this.#output(this.#state.value);
	}

	watch(fn: (n: T) => void)
	{
		this.#state.watch(((o, n) => {
			if (o != n) {
				fn(this.#output(n));
			}
		}));
	}
}
