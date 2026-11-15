/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Car Laundry Redline Design Tokens
        primary: {
          DEFAULT: '#FF4646',
          hover: '#FF2F2F',
          dark: '#E03333',
          light: '#FF6E6E',
          subtle: '#FFF4F4',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          hover: '#FFF4F4',
        },
        tertiary: {
          DEFAULT: '#000000',
        },
        neutral: {
          DEFAULT: '#F5F5F5',
          dark: '#EBEBEB',
          surface: '#FAFAFA',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#141414',
          card: '#FFFFFF',
          cardDark: '#1A1A1A',
        },
        'on-surface': {
          DEFAULT: '#1A1A1A',
          dark: '#F5F5F5',
        },
        muted: {
          DEFAULT: '#333333',
          dark: '#A0A0A0',
          subtle: '#666666',
        },
        'brand-border': {
          DEFAULT: '#E5D7D7',
          dark: 'rgba(255, 255, 255, 0.12)',
        },
        success: '#2ECC71',
        error: '#D93025',

        // Palette aliases mapped to Redline System for seamless backward compatibility
        obsidian: {
          DEFAULT: '#0A0A0A',
          pure: '#000000',
          surface: '#141414',
          surface2: '#1A1A1A',
          surface3: '#222222',
          border: '#E5D7D7',
          borderLight: 'rgba(255, 255, 255, 0.12)',
        },
        pearl: {
          DEFAULT: '#FFFFFF',
          light: '#FFFFFF',
          dark: '#F5F5F5',
        },
        petrol: {
          DEFAULT: '#1A1A1A',
          light: '#2B2B2B',
          dark: '#000000',
          surface: '#141414',
        },
        teal: {
          DEFAULT: '#FF4646', // Primary Redline accent
          light: '#FF6E6E',
          dark: '#E03333',
          muted: '#FFF4F4',
          glow: '#FF4646',
        },
        copper: {
          DEFAULT: '#FF4646', // Primary Redline accent
          light: '#FF6E6E',
          dark: '#FF2F2F',
          subtle: '#FFF4F4',
          glow: '#FF4646',
        },
        graphite: {
          DEFAULT: '#1A1A1A',
          light: '#333333',
          muted: '#666666',
          subtle: '#888888',
          dim: '#A0A0A0',
        },
        softgrey: {
          DEFAULT: '#E5D7D7',
          light: '#F5F5F5',
          dark: '#D5C7C7',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
        full: '9999px',
      },
      spacing: {
        'xs-token': '2px',
        'sm-token': '10px',
        'md-token': '18px',
        'lg-token': '40px',
        'xl-token': '154px',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(0, 0, 0, 0.04), 0 1px 3px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'red-sm': '0 4px 14px rgba(255, 70, 70, 0.28)',
        'red-lg': '0 8px 24px rgba(255, 70, 70, 0.35)',
      }
    },
  },
  plugins: [],
}
