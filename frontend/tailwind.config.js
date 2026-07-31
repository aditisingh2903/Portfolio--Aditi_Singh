/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#08080c', soft: '#0e0d16', card: '#13111d' },
        ink: '#f5f4ff',
        accent: { DEFAULT: '#7c5cff', soft: '#9d83ff', cyan: '#22d3ee', pink: '#ff5db1', amber: '#ffb454' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: { mega: '-0.04em' },
      boxShadow: {
        glow: '0 0 60px -12px rgba(124,92,255,0.6)',
        soft: '0 12px 40px -12px rgba(0,0,0,0.6)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        marqueeY: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-50%)' } },
        glow: { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        spinSlow: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        rise: { '0%': { transform: 'translateY(100%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        marquee: 'marquee 28s linear infinite',
        marqueeRev: 'marquee 32s linear infinite reverse',
        marqueeY: 'marqueeY 25s linear infinite',
        glow: 'glow 4s ease-in-out infinite',
        spinSlow: 'spinSlow 18s linear infinite',
        rise: 'rise 0.8s ease-out',
      },
    },
  },
  plugins: [],
};