import React, { useContext, useEffect, useRef } from 'react'

import { FriendContextType, MessagesContextType } from '@/common/types'
import { ChatBox } from '@/components/chat/ChatBox'
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
            {messages
              .filter(msg => msg.to === friend.userid || msg.from === friend.userid)
              .map((message, idx) => (
                <Text
                  bg={message.to === friend.userid ? 'blue.100' : 'gray.100'}
                  borderRadius={'10px'}
                  color={'gray.800'}
                  fontSize={'lg'}
                  key={`msg:${friend.username}.${idx}`}
                  m={
                    message.to === friend.userid
                      ? '1rem 0 0 auto !important'
                      : '1rem auto 0 0 !important'
                  }
                  maxW={'50%'}
                  p={'0.5rem 1rem'}
                >
                  {message.content}
                </Text>
              ))}
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
