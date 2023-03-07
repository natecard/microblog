import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '/microblog/',
	indexHTML: './index.html',
	jsx: 'react',
	plugins: [react()],
	rollupInputOptions: {
		input: './src/main.tsx',
	},
});
