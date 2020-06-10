import React from 'react'
export const themes = {
    light: {
        foreground: 'black',
        background: 'white',
        header: 'white',
        inactiveTintColor: 'gray',
        activeTintColor: 'black',
        tagButton: 'whitesmoke',
    },
    dark: {
        foreground: 'white',
        background: '#0E0F13',
        header: '#212121',
        inactiveTintColor: '#fff',
        activeTintColor: '#007AFF',
        tagButton: '#505050',
    }
}
const ThemeContext = React.createContext(null)
export default ThemeContext