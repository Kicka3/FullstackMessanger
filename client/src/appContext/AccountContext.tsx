import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BASE_SERV_URL } from '@/common/constants/constants'

export const AccountContext = createContext<
  | {
      handleLogout: () => void
      setUser: React.Dispatch<React.SetStateAction<{ loggedIn: boolean | null }>>
      user: { loggedIn: boolean | null }
    }
  | undefined
>(undefined)

type Props = {
  children: ReactNode
}

export const UserContext = ({ children }: Props) => {
  const [user, setUser] = useState<{ loggedIn: boolean | null }>({ loggedIn: null })
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${BASE_SERV_URL}/auth/login`, {
      credentials: 'include',
    })
      .catch(err => {
        setUser({ loggedIn: false })
        console.error(err)

        return
      })
      .then(r => {
        if (!r || !r.ok || r.status >= 400) {
          setUser({ loggedIn: false })

          return
        }

        return r.json() as Promise<{ loggedIn: boolean }>
      })
      .then(data => {
        if (!data) {
          setUser({ loggedIn: false })

          return
        }
        setUser({ ...data })
        navigate('/home')
      })
  }, [])

  const handleLogout = () => {
    fetch(`${BASE_SERV_URL}/auth/logout`, {
      credentials: 'include',
      method: 'POST',
    })
      .then(() => {
        navigate('/')
      })
      .catch(error => {
        console.error('Error during logout:', error)
      })
  }

  return (
    <AccountContext.Provider value={{ handleLogout, setUser, user }}>
      {children}
    </AccountContext.Provider>
  )
}
