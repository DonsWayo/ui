/**
 * Map a file path / extension to a Shiki bundled language id.
 *
 * Returns `'plaintext'` for anything unknown — never throws, never returns
 * undefined. Safe to feed straight into `<CodeBlock language={...}>`.
 */

const EXT_TO_LANG: Record<string, string> = {
	// JS / TS family
	js: 'javascript',
	mjs: 'javascript',
	cjs: 'javascript',
	jsx: 'jsx',
	ts: 'typescript',
	mts: 'typescript',
	cts: 'typescript',
	tsx: 'tsx',

	// Web / markup
	html: 'html',
	htm: 'html',
	svelte: 'svelte',
	vue: 'vue',
	astro: 'astro',
	xml: 'xml',
	svg: 'xml',

	// Styles
	css: 'css',
	scss: 'scss',
	sass: 'sass',
	less: 'less',
	styl: 'stylus',

	// Data / config
	json: 'json',
	jsonc: 'jsonc',
	json5: 'json5',
	yaml: 'yaml',
	yml: 'yaml',
	toml: 'toml',
	ini: 'ini',
	env: 'shellscript',

	// Markdown / docs
	md: 'markdown',
	mdx: 'mdx',
	markdown: 'markdown',
	rst: 'plaintext',
	tex: 'latex',

	// Systems languages
	rs: 'rust',
	go: 'go',
	c: 'c',
	h: 'c',
	cpp: 'cpp',
	cxx: 'cpp',
	cc: 'cpp',
	hpp: 'cpp',
	cs: 'csharp',
	java: 'java',
	kt: 'kotlin',
	kts: 'kotlin',
	swift: 'swift',
	scala: 'scala',
	zig: 'zig',
	d: 'd',
	nim: 'nim',
	v: 'v',

	// Scripting
	py: 'python',
	pyw: 'python',
	rb: 'ruby',
	php: 'php',
	pl: 'perl',
	pm: 'perl',
	lua: 'lua',
	r: 'r',
	jl: 'julia',
	groovy: 'groovy',
	clj: 'clojure',
	cljs: 'clojure',
	cljc: 'clojure',
	ex: 'elixir',
	exs: 'elixir',
	erl: 'erlang',
	hrl: 'erlang',
	hs: 'haskell',
	ml: 'ocaml',
	mli: 'ocaml',
	fs: 'fsharp',
	fsx: 'fsharp',

	// Shell / ops
	sh: 'shellscript',
	bash: 'shellscript',
	zsh: 'shellscript',
	fish: 'fish',
	ps1: 'powershell',
	bat: 'batch',
	cmd: 'batch',
	nu: 'nushell',
	dockerfile: 'dockerfile',
	dockerignore: 'plaintext',
	gitignore: 'plaintext',
	gitattributes: 'plaintext',
	makefile: 'makefile',
	mk: 'makefile',

	// Queries / DB
	sql: 'sql',
	graphql: 'graphql',
	gql: 'graphql',
	prisma: 'prisma',

	// IaC
	tf: 'terraform',
	tfvars: 'terraform',
	hcl: 'hcl',
	nix: 'nix',

	// Diff / patch / proto
	diff: 'diff',
	patch: 'diff',
	proto: 'proto',
};

const FILENAME_TO_LANG: Record<string, string> = {
	dockerfile: 'dockerfile',
	'docker-compose.yml': 'yaml',
	'docker-compose.yaml': 'yaml',
	makefile: 'makefile',
	gnumakefile: 'makefile',
	cmakelists: 'cmake',
	'cmakelists.txt': 'cmake',
	rakefile: 'ruby',
	gemfile: 'ruby',
	'gemfile.lock': 'plaintext',
	procfile: 'plaintext',
	jenkinsfile: 'groovy',
	'cargo.toml': 'toml',
	'cargo.lock': 'toml',
	'package.json': 'json',
	'tsconfig.json': 'jsonc',
	'.gitignore': 'plaintext',
	'.dockerignore': 'plaintext',
	'.env': 'shellscript',
	'.env.local': 'shellscript',
	'.editorconfig': 'ini',
};

/**
 * Detect Shiki language id from a file path.
 * Falls back to `'plaintext'` for unknown extensions.
 *
 * @example
 *   detectLanguageFromPath('src/main.rs')        // 'rust'
 *   detectLanguageFromPath('Dockerfile')         // 'dockerfile'
 *   detectLanguageFromPath('a/b/.eslintrc.json') // 'json'
 *   detectLanguageFromPath('LICENSE')            // 'plaintext'
 */
export function detectLanguageFromPath(path: string): string {
	if (!path) return 'plaintext';

	const segments = path.split('/');
	const file = (segments[segments.length - 1] ?? '').toLowerCase();

	// Exact filename match (Dockerfile, Makefile, Cargo.toml, ...)
	if (FILENAME_TO_LANG[file]) return FILENAME_TO_LANG[file];

	// Extension lookup — handle `.eslintrc.json` style (last `.<ext>` wins)
	const dot = file.lastIndexOf('.');
	if (dot > -1 && dot < file.length - 1) {
		const ext = file.slice(dot + 1);
		if (EXT_TO_LANG[ext]) return EXT_TO_LANG[ext];
	}

	// Bare dotfiles like `.bashrc`, `.zshrc`
	if (file.startsWith('.')) {
		const stem = file.slice(1);
		if (stem.endsWith('rc') || stem.endsWith('profile')) return 'shellscript';
	}

	return 'plaintext';
}
