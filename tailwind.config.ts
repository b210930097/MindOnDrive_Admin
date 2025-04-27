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
    colors: {
      brand: {
        25: '#f4f9ff',
        50: '#eff8ff',
        100: '#d1e9ff',
        200: '#b2ddff',
        300: '#84caff',
        400: '#53b0fd',
        500: '#2e90fa',
        600: '#156fee',
        700: '#175cd3',
        800: '#1849a9',
        900: '#194084',
        DEFAULT: '#156fee',
      },
      gray: {
        25: '#fbfcfc',
        50: '#f8f9fb',
        100: '#f2f3f6',
        200: '#eaecf0',
        300: '#cfd4dc',
        400: '#98a1b2',
        500: '#667084',
        600: '#475466',
        700: '#344053',
        800: '#1d2838',
        900: '#0f1728',
        DEFAULT: '#475466',
      },
      error: {
        25: '#fefafa',
        50: '#fef2f1',
        100: '#fee3e1',
        200: '#fecdc9',
        300: '#fca19b',
        400: '#f97066',
        500: '#f04437',
        600: '#d92c20',
        700: '#b32218',
        800: '#901f17',
        900: '#7a2619',
        DEFAULT: '#d92c20',
      },
      warning: {
        25: '#fffcf4',
        50: '#fff9eb',
        100: '#feefc6',
        200: '#fede88',
        300: '#fec84a',
        400: '#fcb022',
        500: '#f78f08',
        600: '#db6803',
        700: '#b54707',
        800: '#93370c',
        900: '#792d0d',
        DEFAULT: '#db6803',
      },
      success: {
        25: '#f5fef9',
        50: '#ebfdf2',
        100: '#d0fadf',
        200: '#a6f4c5',
        300: '#6be9a6',
        400: '#31d583',
        500: '#12b669',
        600: '#039754',
        700: '#027947',
        800: '#055f3a',
        900: '#054e31',
        DEFAULT: '#039754',
      },
      'blue-gray': {
        25: '#fbfbfd',
        50: '#f8f8fb',
        100: '#eaebf5',
        200: '#d5d9eb',
        300: '#afb5d9',
        400: '#707abc',
        500: '#4e5aa6',
        600: '#3e4783',
        700: '#353e72',
        800: '#283056',
        900: '#101222',
        DEFAULT: '#3e4783',
      },
      'blue-light': {
        25: '#f4faff',
        50: '#f0f9ff',
        100: '#dff2fe',
        200: '#b9e5fd',
        300: '#7bd4fd',
        400: '#36bff9',
        500: '#0ba4eb',
        600: '#0085c9',
        700: '#016aa2',
        800: '#055986',
        900: '#0a4a6f',
        DEFAULT: '#0085c9',
      },
      blue: {
        25: '#f4f9ff',
        50: '#eff8ff',
        100: '#d1e9ff',
        200: '#b2ddff',
        300: '#84caff',
        400: '#53b0fd',
        500: '#2e90fa',
        600: '#156fee',
        700: '#175cd3',
        800: '#1849a9',
        900: '#194084',
        DEFAULT: '#156fee',
      },
      indigo: {
        25: '#f4f8ff',
        50: '#eef3ff',
        100: '#dfeaff',
        200: '#c6d7fe',
        300: '#a3bbfd',
        400: '#7f98f9',
        500: '#6071f3',
        600: '#444ce6',
        700: '#3537cc',
        800: '#2d31a5',
        900: '#2c3282',
        DEFAULT: '#444ce6',
      },
      purple: {
        25: '#faf9ff',
        50: '#f3f3ff',
        100: '#eae8fe',
        200: '#d9d5fe',
        300: '#bcb4fd',
        400: '#9a89fb',
        500: '#7959f8',
        600: '#6838ee',
        700: '#5925db',
        800: '#4a1fb7',
        900: '#3e1b96',
        DEFAULT: '#6838ee',
      },
      pink: {
        25: '#fdf6fb',
        50: '#fdf1f9',
        100: '#fce6f5',
        200: '#fbceee',
        300: '#f9a7df',
        400: '#f570c7',
        500: '#ed46bb',
        600: '#dc2590',
        700: '#c01573',
        800: '#9e155e',
        900: '#841651',
        DEFAULT: '#dc2590',
      },
      rose: {
        25: '#fff4f6',
        50: '#fef1f2',
        100: '#ffe3e7',
        200: '#feccd5',
        300: '#fea2b3',
        400: '#fc6f8d',
        500: '#f53d68',
        600: '#e31a53',
        700: '#c00f47',
        800: '#a10f42',
        900: '#89113d',
        DEFAULT: '#e31a53',
      },
      orange: {
        25: '#fff9f4',
        50: '#fff5ed',
        100: '#ffead5',
        200: '#fddcaa',
        300: '#feb172',
        400: '#fd8439',
        500: '#fb6413',
        600: '#ec4909',
        700: '#c3320a',
        800: '#9b2910',
        900: '#7d2410',
        DEFAULT: '#ec4909',
      },
    },
    textColor: {
      primary: '#0f1728', // --gray-900
      'secondary-contrast': '#344053', // --gray-700
      secondary: '#667084', // --gray-500
      'secondary-light': '#98a1b2', // --gray-400
      tertiary: '#cfd4dc', // --gray-300
      brand: '#175cd3', // --brand-700
      'brand-contrast': '#1849a9', // --brand-800
      'brand-light': '#84caff', // --brand-300
      'brand-secondary': '#2e90fa', // --brand-500
      invert: '#ffffff', // --base-white
      success: '#12b669', // --success-500
      danger: '#b32218', // --error-700
      'danger-contrast': '#901f17', // --error-800
      'danger-light': '#fca19b', // --error-300
      'danger-secondary': '#f04437', // --error-500
      warning: '#b54707', // --warning-700
      'warning-secondary': '#dc6803', // --error-500
      income: '#12b669', // --success-500
      outcome: '#f04437', // --error-500
      'icon-primary': '#0f1728', // --gray-900
      'icon-secondary': '#344053', // --gray-700
      'icon-tertiary': '#98a1b2', // --gray-400
      'icon-brand': '#156fee', // --brand-600
      'icon-invert': '#ffffff', // --base-white
      'icon-danger': '#d92c20', // --error-600
      'icon-success': '#12b669', // --success-500
      white: '#ffffff', // --base-white
    },
    backgroundColor: {
      primary: '#fef6ef', // --base-white
      secondary: '#f8f9fb', // --gray-50
      tertiary: '#f2f3f6', // --gray-100
      contrast: '#98a1b2', // --gray-400
      disabled: '#fbfcfc', // --gray-25
      invert: '#0f1728', // --gray-900
      brand: '#156fee', // --brand-600
      'brand-contrast': '#175cd3', // --brand-700
      'brand-light': '#2e90fa', // --brand-500
      'brand-secondary': '#d1e9ff', // --brand-100
      'brand-secondary-contrast': '#b2ddff', // --brand-200
      'brand-secondary-light': '#eff8ff', // --brand-50
      success: '#12b669', // --success-500
      'success-light': '#d0fadf', // --success-100
      'success-secondary': '#ebfdf2', // --success-50
      danger: '#d92c20', // --error-600
      'danger-contrast': '#b32218', // --error-700
      'danger-light': '#fecdc9', // --error-200
      'danger-secondary': '#fef2f1', // --error-50
      'danger-secondary-contrast': '#fee3e1', // --error-100
      'danger-secondary-light': '#fefafa', // --error-25
      warning: '#db6803', // --warning-600
      'warning-secondary-contrast': '#feefc6', // --warning-100
      'warning-secondary': '#fff9eb', // --warning-50
      transparent: 'transparent',
    },
    borderColor: {
      primary: '#98a1b2', // --gray-400
      secondary: '#cfd4dc', // --gray-300
      tertiary: '#eaecf0', // --gray-200
      'tertiary-light': '#f2f3f6', // --gray-100
      light: '#ffffff', // --base-white
      invert: '#0f1728', // --gray-900
      brand: '#156fee', // --brand-600
      'brand-contrast': '#175cd3', // --brand-700
      'brand-light': '#2e90fa', // --brand-500
      'brand-secondary': '#b2ddff', // --brand-200
      'brand-secondary-contrast': '#84caff', // --brand-300
      'brand-secondary-light': '#d1e9ff', // --brand-100
      success: '#12b669', // --success-500
      'success-secondary': '#a6f4c5', // --success-200
      'success-light': '#ebfdf2', // --success-50
      danger: '#d92c20', // --error-600
      'danger-contrast': '#b32218', // --error-700
      'danger-light': '#fca19b', // --error-300
      'danger-secondary': '#fef2f1', // --error-50
      'danger-secondary-contrast': '#fee3e1', // --error-100
      'danger-secondary-light': '#fefafa', // --error-25
      warning: '#db6803', // --warning-600
      'warning-secondary-contrast': '#feefc6', // --warning-100
      'warning-secondary': '#fff9eb', // --warning-50
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
