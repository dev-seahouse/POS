/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fdf2e9',
          DEFAULT: '#f57c00',
          dark: '#bb4d00',
        },
        secondary: {
          light: '#fff3e0',
          DEFAULT: '#ff9800',
          dark: '#e65100',
        },
        accent: {
          light: '#ffecb3',
          DEFAULT: '#ffca28',
          dark: '#ffa000',
        },
        background: {
          light: '#ffffff',
          DEFAULT: '#f5f5f5',
          dark: '#eeeeee',
        },
        text: {
          light: '#4e4e4e',
          DEFAULT: '#212121',
          dark: '#1a1a1a',
        },
      },
      fontFamily: {
        body: ['"Open Sans"', 'sans-serif'],
        heading: ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

