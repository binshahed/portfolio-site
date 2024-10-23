  
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeContextProvider from './contexts/ThemeContext.jsx'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
     <ThemeContextProvider>
      <App />
      <Toaster />
    </ThemeContextProvider>
  // </React.StrictMode>,
)
