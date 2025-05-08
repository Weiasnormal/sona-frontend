import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@radix-ui/themes/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
