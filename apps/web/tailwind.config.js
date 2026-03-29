const preset = require('../../tailwind.preset.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../libs/shared-ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [preset],
};
