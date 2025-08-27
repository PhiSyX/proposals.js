export type WatcherCallback<T> = (oldValue: T, newValue: T) => void;

export interface WatcherOptions
{
	immediate?: boolean;
}

export class Watcher<T>
{
    #callback: WatcherCallback<T>
	#options?: WatcherOptions;

	constructor(
		callback: WatcherCallback<T>,
		options:
			| WatcherOptions
			= { immediate: false }
	)
	{
		this.#callback = callback;
		this.#options = options;
	}

	call(oldValue: T, newValue: T)
	{
		this.#callback(oldValue, newValue);
	}

	getOptions()
	{
		return this.#options;
	}
}
