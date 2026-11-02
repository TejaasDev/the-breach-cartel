/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#0a0a0c',
          900: '#121316',
          850: '#17191e',
          800: '#1f2229',
          700: '#2b2f38',
          600: '#3d424e',
        },
        wood: {
          dark: '#160d08',
          medium: '#2a1a10',
          light: '#3e2719',
          border: '#4d301f',
        },
        burgundy: {
          900: '#26060a',
          800: '#3c0a10',
          700: '#541018',
          600: '#751a24',
          500: '#9b2430',
        },
        parchment: {
          50: '#fcfaf2',
          100: '#f7f2e4',
          200: '#eee4cb',
          300: '#e1d2ad',
          400: '#cfba8b',
          500: '#b89e6c',
        },
        brass: {
          light: '#edd49d',
          DEFAULT: '#cba358',
          dark: '#9d7831',
        },
        evidence: {
          red: '#a31d1d',
          stamp: '#b91c1c',
          tag: '#d97706',
        }
      },
      fontFamily: {
        typewriter: ['"Special Elite"', '"Courier Prime"', 'Courier', 'monospace'],
        headline: ['"Playfair Display"', 'Georgia', 'serif'],
        classified: ['"Cinzel"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'noir': '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)',
        'dossier': '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(203, 163, 88, 0.08)',
        'lamp': '0 0 80px 25px rgba(237, 212, 157, 0.15)',
        'stamp': 'inset 0 0 0 2px rgba(185, 28, 28, 0.8)',
      },
      animation: {
        'flicker': 'flicker 4s infinite ease-in-out',
        'dust': 'dust 20s infinite linear',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41%': { opacity: '1' },
          '42%': { opacity: '0.85' },
          '43%': { opacity: '1' },
          '75%': { opacity: '1' },
          '76%': { opacity: '0.9' },
          '77%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
