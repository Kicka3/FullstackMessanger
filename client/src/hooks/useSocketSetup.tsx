import { useContext, useEffect } from 'react'

import { AccountContext } from '@/appContext'
import { socket } from '@/common/socket'
import { Message, User } from '@/common/types'

type Props = {
  setFriendList: (friendList: User[]) => void
  setMessages: (messages: Message[]) => void
}

export const useSocketSetup = ({ setFriendList, setMessages }: Props) => {
  const accountContext = useContext(AccountContext)

  useEffect(() => {
    if (!accountContext) {
      throw new Error('useSocketSetup must be used within an AccountProvider')
    }

    socket.connect()
    socket.on('friends', friendList => {
      setFriendList(friendList)
    })
    socket.on('messages', messages => {
      setMessages(messages)
    })
    socket.on('dm', (message: Message) => {
      // Явно указываем тип параметра prevMsgs и тип возвращаемого значения
      setMessages((prevMsgs: Message[]) => {
        if (!Array.isArray(prevMsgs)) {
          throw new Error('prevMsgs is not an array')
        }

        return [message, ...prevMsgs]
      })
    })
    socket.on('connected', (status, username) => {
      // Явно указываем тип параметра prevFriends и тип возвращаемого значения
      setFriendList((prevFriends: User[]) => {
        return [...prevFriends].map(friend => {
          if (friend.username === username) {
            friend.connected = status
          }

          return friend
        })
      })
    })
    socket.on('connect_error', () => {
      if (accountContext && accountContext.setUser) {
        accountContext.setUser({ loggedIn: false })
      }
    })

    return () => {
      socket.off('connect_error')
      socket.off('connected')
      socket.off('friends')
      socket.off('messages')
      socket.off('dm')
    }
  }, [setFriendList, setMessages, accountContext])
}
