// Type declarations for Monaco worker imports.
//
// These are Vite-specific `?worker` query imports that resolve to a
// constructor for a Web Worker. TypeScript otherwise can't find them
// because they don't physically exist as ESM modules on disk — Vite
// rewrites them at build time. The same pattern is used for Vite's
// `vite/client` types but we only need the Monaco ones here.

declare module 'monaco-editor/esm/vs/editor/editor.worker?worker' {
	const WorkerCtor: { new (): Worker };
	export default WorkerCtor;
}

declare module 'monaco-editor/esm/vs/language/json/json.worker?worker' {
	const WorkerCtor: { new (): Worker };
	export default WorkerCtor;
}

declare module 'monaco-editor/esm/vs/language/css/css.worker?worker' {
	const WorkerCtor: { new (): Worker };
	export default WorkerCtor;
}

declare module 'monaco-editor/esm/vs/language/html/html.worker?worker' {
	const WorkerCtor: { new (): Worker };
	export default WorkerCtor;
}

declare module 'monaco-editor/esm/vs/language/typescript/ts.worker?worker' {
	const WorkerCtor: { new (): Worker };
	export default WorkerCtor;
}
