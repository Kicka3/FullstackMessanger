import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AccountContext } from '@/appContext'

const useAuth = () => {
  const accountContext = useContext(AccountContext)

  return accountContext && accountContext.user && accountContext.user.loggedIn
}

export const PrivateRoutes = () => {
  const isAuth = useAuth()

  return isAuth ? <Outlet /> : <Navigate to={'/'} />
}
