import type { StringExtension } from "#root/string/extension";

export type ToStringRaw = {
	toString(): string;
} & {};

export type ToString = (string | StringExtension) & ToStringRaw;
export type Primitive = string | number | bigint | boolean;
export type FullPredicate = boolean | (() => boolean);

export type OmitFirstArray<T>  = T extends [any, ...infer R] ? R : never;
