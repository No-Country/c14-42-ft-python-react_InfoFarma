/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      flexBasis: {
        20: '20%', //flexbasis for the SideMenu
        80: '80%' //flexbasis for the body
      },

      height: {
        '90': '90%'
      },

      colors: {
        sideMenuBg: '#181818',
        bodyBg: '#ffff',
        titleColor: '#2b2b2b',
        hoverColor: '#262626',
        textColor: '#e2e2e2',
        colorOne: '#f6eff4',
        colorTwo: '#fbf0ef',
        colorThree: '#f1fcf0',
        colorFour: '#fcf8ef',
        gradient: 'linear-gradient(rgb(56, 194, 166), rgb(124, 83, 151))'
      },
    },
  },
  plugins: [],
}

