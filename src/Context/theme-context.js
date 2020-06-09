import React from 'react'
export const themes = {
    light: {
        foreground: 'black',
        background: 'white',
        header: 'white',
        inactiveTintColor: 'gray',
        activeTintColor: 'black',
    },
    dark: {
        foreground: 'white',
        background: '#0E0F13',
        header: '#212121',
        inactiveTintColor: '#fff',
        activeTintColor: '#007AFF',
    }
}
const ThemeContext = React.createContext(null)
export default ThemeContext