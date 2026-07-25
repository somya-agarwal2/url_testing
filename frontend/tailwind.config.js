/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        backgroundSecondary: '#F9FAFB',
        cards: '#FFFFFF',
        primary: '#4F46E5',
        primaryGradientEnd: '#4F46E5', // kept same for fallback
        primaryHover: '#4338CA',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        borderSubtle: '#E5E7EB',
        textMain: '#111827',
        textMuted: '#6B7280',
        dummy: '#F8F8F8',
      },
      borderRadius: {
        '2xl': '18px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
