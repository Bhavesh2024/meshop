import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import cart from './redux/cart.js'
import ThemeContextProvider from './context/ThemeContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>

    <Provider store={cart}>

    <App />
    </Provider>
    </ThemeContextProvider>
  </StrictMode>,
)
