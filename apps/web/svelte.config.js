import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  preprocess: [mdsvex({ extensions: ['.svelte.md', '.md', '.svx'] }),vitePreprocess()],
  kit: {
    adapter: adapter(),
    prerender: {
			handleHttpError: 'fail'
		}
  },
  shadcn: {
    componentPath: './src/lib/components/ui'
  },
  extensions: ['.svelte', '.md', '.svelte.md'],
};
export default config;
