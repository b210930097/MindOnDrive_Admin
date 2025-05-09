import type { Config } from 'tailwindcss';

export default {
  corePlugins: {
    preflight: false,
  },
  important: '#app',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
      serif: ['M PLUS 1', 'serif'],
    },
    screens: {
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    textColor: {
      white: '#ffffff',
      black: '#101828',
      gray: '#616161',
      primary: '#92613A',
      secondary: '#553922',
      disabled: '#9E9E9E',
      success: '#12b669',
      danger: '#b32218', // --error-700
      'danger-contrast': '#901f17', // --error-800
      'danger-light': '#fca19b', // --error-300
      'danger-secondary': '#f04437', // --error-500
      warning: '#b54707',
    },
    backgroundColor: {
      white: '#ffffff',
      primary: '#FCE2CE',
      secondary: '#FEF6EF',
      'secondary-light': '#FEF1E5',
      disabled: '#F9FAFB',
      brand: '#92613A',
      success: '#12b669',
      danger: '#D92D20',
      'danger-contrast': '#b32218',
      'danger-light': '#fca19b',
      'danger-secondary': '#fef2f1',
      'danger-secondary-contrast': '#fee3e1',
      'danger-secondary-light': '#fefafa',
      warning: '#b54707',
      transparent: 'transparent',
    },
    borderColor: {
      white: '#ffffff',
      black: '#757575',
      gray: '#EAECF0',
      primary: '#FCE2CE',
      secondary: '#FEF6EF',
      disabled: '#D0D0D0',
      success: '#12b669',
      danger: '#d92c20', // --error-600
      'danger-contrast': '#b32218', // --error-700
      'danger-light': '#fca19b', // --error-300
      'danger-secondary': '#fef2f1', // --error-50
      'danger-secondary-contrast': '#fee3e1', // --error-100
      'danger-secondary-light': '#fefafa', // --error-25
      warning: '#b54707',
    },
    borderRadius: {
      none: '0px',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '10px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '20px',
      '4xl': '24px',
      full: '9999px',
    },
    borderWidth: {
      none: '0px',
      xxs: '2px',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '10px',
      xl: '12px',
      '2xl': '14px',
      '3xl': '16px',
      '4xl': '18px',
      '5xl': '20px',
      '6xl': '24px',
      '7xl': '32px',
      '8xl': '40px',
      '9xl': '48px',
      '10xl': '64px',
      '11xl': '80px',
      '12xl': '96px',
      '13xl': '128px',
      '14xl': '160px',
    },
    spacing: {
      none: '0px',
      xxs: '2px',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '10px',
      xl: '12px',
      '2xl': '14px',
      '3xl': '16px',
      '4xl': '18px',
      '5xl': '20px',
      '6xl': '24px',
      '7xl': '32px',
      '8xl': '40px',
      '9xl': '48px',
      '10xl': '64px',
      '11xl': '80px',
      '12xl': '96px',
      '13xl': '128px',
      '14xl': '160px',
    },
    fontSize: {
      'display-lg': ['48px', { lineHeight: '60px' }],
      'display-md': ['36px', { lineHeight: '44px' }],
      'display-sm': ['30px', { lineHeight: '38px' }],
      'display-xs': ['24px', { lineHeight: '32px' }],
      'text-xl': ['20px', { lineHeight: '30px' }],
      'text-lg': ['18px', { lineHeight: '28px' }],
      'text-md': ['16px', { lineHeight: '22px' }],
      'text-sm': ['14px', { lineHeight: '20px' }],
      'text-xs': ['12px', { lineHeight: '18px' }],
      't-xl': ['20px', { lineHeight: '30px' }],
      't-lg': ['18px', { lineHeight: '28px' }],
      't-md': ['16px', { lineHeight: '22px' }],
      't-sm': ['14px', { lineHeight: '20px' }],
      't-xs': ['12px', { lineHeight: '18px' }],
    },
    fontWeight: {
      bold: '700',
      medium: '500',
      regular: '400',
    },
    boxShadowColor: {
      '4px-primary-100': '#eff8ff', // --brand-50
      '4px-gray-100': '#f2f3f6', // --gray-100
      '4px-error-100': '#fee4e2', // --error-100
      '4px-gray-600': '#475466', // --gray-600
      '4px-primary-600': '#7f56d9', // --purple-600
    },
    boxShadow: {
      '4px-primary-100': '0px 0px 0px 4px rgba(239, 248, 255, 1)',
      '4px-gray-100': '0px 0px 0px 4px rgba(242, 244, 247, 1)',
      '4px-error-100':
        '0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #fee4e2',
      '4px-gray-600': '0px 0px 0px 4px rgba(71, 84, 103, 1)',
      '4px-primary-600': '0px 0px 0px 4px rgba(127, 86, 217, 1)',
      xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      sm: '0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)',
      md: '0px 2px 4px rgba(16, 24, 40, 0.06), 0px 4px 8px rgba(16, 24, 40, 0.1)',
      lg: '0px 4px 6px rgba(16, 24, 40, 0.03), 0px 12px 16px rgba(16, 24, 40, 0.08)',
      xl: '0px 8px 8px rgba(16, 24, 40, 0.03), 0px 20px 24px rgba(16, 24, 40, 0.08)',
      '2xl': '0px 24px 48px rgba(16, 24, 40, 0.18)',
      '3xl': '0px 32px 64px rgba(16, 24, 40, 0.14)',
      'portfolio-main-centre-md': '0px 75px 150px rgba(52, 64, 84, 0.14)',
      'portfolio-main-centre-lg': '0px 100px 200px rgba(52, 64, 84, 0.18)',
      'portfolio-overlay-right-lg': '-100px 100px 150px rgba(52, 64, 84, 0.12)',
      'portfolio-overlay-left-lg': '100px 100px 150px rgba(52, 64, 84, 0.12)',
      'portfolio-grid-shadow-md': '32px 32px 64px rgba(52, 64, 84, 0.08)',
      'focus-primary': '0px 0px 0px 4px #EFF8FF',
      'focus-destructive':
        '0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      none: 'none',
    },
    blur: {
      sm: '8',
      md: '16',
      lg: '24',
      xl: '40',
    },
    ringColor: {
      '4px-primary-100': '#eff8ff', // --brand-50
      '4px-gray-100': '#f2f3f6', // --gray-100
      '4px-error-100': '#fee4e2', // --error-100
      '4px-gray-600': '#475466', // --gray-600
      '4px-primary-600': '#7f56d9', // --purple-600
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
