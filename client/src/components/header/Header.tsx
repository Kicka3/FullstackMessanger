import { useContext } from 'react'

import { AccountContext } from '@/appContext'
import { ToggleThemeMode } from '@/components/toggleTheme'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

import s from './header.module.scss'

export const Header = () => {
  const handleLogoutContext = useContext(AccountContext)

  if (!handleLogoutContext) {
    return null
  }
  const { handleLogout } = handleLogoutContext

  const onLogout = () => {
    handleLogout()
  }

  return (
    <section className={s.section}>
      <ToggleThemeMode />
      <header>
        <nav className={s.siteMenu}>
          <div className={s.existingMenu}>
            <svg className={s.logo} viewBox={'0 0 20 20'}>
              <circle cx={'10'} cy={'10'} fill={'#00BBF9'} r={'10'} />
            </svg>
            <Button
              colorScheme={'blue'}
              onClick={onLogout}
              right={'100px'}
              rightIcon={<ArrowForwardIcon />}
              variant={'outline'}
            >
              Logout
            </Button>
          </div>
        </nav>
      </header>
    </section>
  )
}
