import { State } from "#root/signals/state";
import { Computed } from "#root/signals/computed";
import { Watcher } from "#root/signals/watcher";

export const Signal = {
	State,
	Computed,
	Watcher,
};

export function signal<T>(data: T): State<T>
{
	return new State(data);
}
