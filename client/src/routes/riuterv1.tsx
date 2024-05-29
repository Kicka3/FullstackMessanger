import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AccountContext } from '@/appContext'
import { Login } from '@/components/Login'
import { HomePage } from '@/components/homePage'
import { SignUp } from '@/components/signUp'
import { PrivateRoutes } from '@/routes/PrivateRoutes'
import { Center, Spinner } from '@chakra-ui/react'

export const Views = () => {
  const accountContext = useContext(AccountContext)

  if (!accountContext) {
    return null
  }

  const { user } = accountContext

  return user.loggedIn === null ? (
    <Center h={'100vh'}>
      <Spinner
        color={'blue.500'}
        emptyColor={'gray.200'}
        size={'xl'}
        speed={'0.65s'}
        thickness={'4px'}
      />
    </Center>
  ) : (
    <Routes>
      <Route element={<Login />} path={'/'} />
      <Route element={<SignUp />} path={'/register'} />
      <Route element={<PrivateRoutes />}>
        <Route element={<HomePage />} path={'/home'} />
      </Route>
      <Route element={<Login />} path={'*'} />
    </Routes>
  )
}
