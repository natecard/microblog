import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '/',
	indexHTML: './index.html',
	jsx: 'react',
	plugins: [react()],
	rollupInputOptions: {
		input: './main.tsx',
	},
});
