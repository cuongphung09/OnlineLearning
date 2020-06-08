import React from 'react'
export const themes = {
    light: {
        foreground: 'black',
        background: 'white'
    },
    dark:{
        foreground: 'white',
        background: '#0E0F13'
    }
}
const ThemeContext = React.createContext(null) 
export default ThemeContext