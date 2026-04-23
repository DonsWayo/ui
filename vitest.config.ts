import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'path';

const sharedPlugins = [svelte({ hot: false })];
const sharedResolve = {
	alias: { $lib: resolve(__dirname, 'src/lib') },
	conditions: ['browser'],
};

export default defineConfig({
	plugins: sharedPlugins,
	resolve: sharedResolve,
	test: {
		projects: [
			// Component unit tests (jsdom)
			{
				plugins: sharedPlugins,
				resolve: sharedResolve,
				test: {
					name: 'unit',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					setupFiles: ['./src/tests/setup.ts'],
					environment: 'jsdom',
				},
			},
			// Storybook story tests (real Chromium via Playwright)
			{
				plugins: [...sharedPlugins, storybookTest({ configDir: '.storybook' })],
				resolve: sharedResolve,
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright(),
						instances: [{ browser: 'chromium' }],
					},
					setupFiles: ['.storybook/vitest.setup.ts'],
				},
			},
		],
	},
});
