import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [svelte(), tailwindcss()],
	resolve: {
		alias: {
			$lib: resolve(__dirname, 'src/lib'),
		},
	},
	build: {
		lib: {
			entry: './src/lib/index.ts',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['svelte', 'svelte/*', 'bits-ui', 'tailwind-variants', 'clsx', 'tailwind-merge'],
		},
	},
});
