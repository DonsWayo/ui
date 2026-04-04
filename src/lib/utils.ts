export { cn } from './utils/cn.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithElementRef<T = any, E extends HTMLElement = HTMLElement> = T & {
	ref?: E | null;
};

export type WithoutChildren<T> = T extends { children?: unknown } ? Omit<T, 'children'> : T;

export type WithoutChild<T> = T extends { child?: unknown } ? Omit<T, 'child'> : T;

export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
