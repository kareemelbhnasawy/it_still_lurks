/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces — matches Stitch "Forensic Ledger" palette
        void: {
          DEFAULT: '#070707',
          900: '#000000',
          800: '#0e0e0e', // surface-container-lowest
          700: '#131313', // surface
          600: '#1b1b1b', // surface-container-low
          500: '#1f1f1f', // surface-container
        },
        ash: {
          900: '#1f1f1f',
          800: '#2a2a2a', // surface-container-high
          700: '#353535', // surface-container-highest
          600: '#393939', // surface-bright
          500: '#4a4a4a', // outline (liminal gray)
          400: '#6a6a6a',
          300: '#8a8a8a',
          200: '#c8c6c6', // secondary
        },
        bone: '#e2e2e2',   // on-surface
        dirty: '#d4d1c9',
        rust: {
          DEFAULT: '#8a0d14',
          bright: '#b22222', // primary-container (Stitch oxidized red)
          dark: '#690007',   // on-primary
          deep: '#410003',
        },
        signal: '#3a4550',
        oxblood: '#92030f',
      },
      fontFamily: {
        display: ['"Newsreader"', '"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        'widest-2': '0.2em',
        'widest-3': '0.32em',
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 10vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
      },
      animation: {
        'flicker-slow': 'flicker 7s infinite',
        'grain': 'grain 1.2s steps(6) infinite',
        'scan': 'scan 8s linear infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'drift': 'drift 22s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 96%, 100%': { opacity: '1' },
          '97%': { opacity: '0.82' },
          '97.5%': { opacity: '1' },
          '98%': { opacity: '0.76' },
          '98.5%': { opacity: '1' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(-4%, 2%)' },
          '30%': { transform: 'translate(2%, -4%)' },
          '40%': { transform: 'translate(-2%, 5%)' },
          '50%': { transform: 'translate(-4%, 2%)' },
          '60%': { transform: 'translate(3%, 0)' },
          '70%': { transform: 'translate(0, 3%)' },
          '80%': { transform: 'translate(-3%, 1%)' },
          '90%': { transform: 'translate(2%, -3%)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.42' },
          '50%': { opacity: '0.68' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-1.5%, -0.8%, 0) scale(1.03)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
