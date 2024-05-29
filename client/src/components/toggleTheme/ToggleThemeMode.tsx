import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button, useColorMode } from '@chakra-ui/react'

export const ToggleThemeMode = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const onToggleMode = () => {
    toggleColorMode()
  }

  return (
    <Button m={'1rem'} onClick={onToggleMode} pos={'absolute'} right={'0'} top={'-10px'}>
      {colorMode === 'dark' ? <SunIcon color={'orange.200'} /> : <MoonIcon color={'blue.700'} />}
    </Button>
  )
}
