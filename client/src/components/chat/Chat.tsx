import React, { useContext, useEffect, useRef } from 'react'

import { FriendContextType, MessagesContextType } from '@/common/types'
import { ChatBox } from '@/components/chat/ChatBox'
import { FriendChat } from '@/components/chat/friendChat'
import { FriendContext, MessagesContext } from '@/components/homePage'
import { TabPanel, TabPanels, Text, VStack } from '@chakra-ui/react'

type Props = {
  userid: string
}

export const Chat = ({ userid }: Props) => {
  const { friendList } = useContext(FriendContext as React.Context<FriendContextType>)
  const { messages } = useContext(MessagesContext as React.Context<MessagesContextType>)

  const bottomDiv = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (bottomDiv.current) {
      bottomDiv.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return friendList.length > 0 ? (
    <VStack h={'100%'} justify={'end'}>
      <TabPanels overflowY={'scroll'}>
        {friendList.map(friend => (
          <VStack
            as={TabPanel}
            flexDir={'column-reverse'}
            key={`chat:${friend.username}`}
            w={'100%'}
          >
            <div ref={bottomDiv} />

            <FriendChat friend={friend} messages={messages} />
          </VStack>
        ))}
      </TabPanels>
      <ChatBox userid={userid} />
    </VStack>
  ) : (
    <VStack fontSize={'lg'} justify={'center'} pt={'5rem'} textAlign={'center'} w={'100%'}>
      <TabPanels>
        <TabPanel>
          <Text>No friend yet</Text>
          <Text marginTop={'30px'}>Click add friend to start chatting</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  )
}
