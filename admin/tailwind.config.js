import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        bottom: 'bottom',
      },
      width: {
        'device-width': '360px',
      },
      height: {
        'device-height': '640px',
      },
    },
  },
  plugins: [typography],
};
