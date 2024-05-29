import { createContext, useState } from 'react'

import { FriendContextType, Message, MessagesContextType, User } from '@/common/types'
import { Chat } from '@/components/chat'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sideBar'
import { useSocketSetup } from '@/hooks/useSocketSetup'
import { Grid, GridItem, Tabs } from '@chakra-ui/react'

export const FriendContext = createContext<FriendContextType | undefined>(undefined)
export const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export const HomePage = () => {
  const [friendList, setFriendList] = useState<User[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [friendIndex, setFriendIndex] = useState(0)

  useSocketSetup({ setFriendList, setMessages })

  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <Header />
      <Grid
        as={Tabs}
        h={'100vh'}
        onChange={index => setFriendIndex(+index)}
        templateColumns={'repeat(10, 1fr)'}
      >
        <GridItem borderRight={'1px solid gray'} colSpan={3}>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={7} maxH={'100vh'}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <Chat userid={friendList[friendIndex]?.userid} />
          </MessagesContext.Provider>
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  )
}
