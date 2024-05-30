import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BASE_SERV_URL } from '@/common/constants/constants'
import axios from 'axios'

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
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_SERV_URL}/auth/login`, {
          withCredentials: true,
        })

        if (response.status >= 400) {
          setUser({ loggedIn: false })

          return
        }

        setUser({ ...response.data })
        navigate('/home')
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser({ loggedIn: false })
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_SERV_URL}/auth/logout`, null, {
        withCredentials: true,
      })
      navigate('/')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <AccountContext.Provider value={{ handleLogout, setUser, user }}>
      {children}
    </AccountContext.Provider>
  )
}
