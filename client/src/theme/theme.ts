import { extendTheme } from '@chakra-ui/react'

const theme = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
        margin: 0,
        mozOsxFontSmoothing: 'grayscale',
        webkitFontSmoothing: 'antialiased',
      },

      code: {
        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
      },
    },
  },
}

export default extendTheme(theme)
