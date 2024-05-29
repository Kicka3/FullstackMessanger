import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { UserContext } from '@/appContext'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'

import './styles/index.scss'

import { App } from './App'
import theme from './theme/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>
)
