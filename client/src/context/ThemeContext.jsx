import React,{createContext,useState} from 'react'
export const ThemeContext = createContext(0);


const ThemeContextProvider = ({children}) =>{
  
  const [theme, setTheme] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  return (
    <>
      <ThemeContext.Provider value={{theme,setTheme}}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}

export default ThemeContextProvider