import { Message, User } from '@/common/types'
import { Text } from '@chakra-ui/react'

type Props = {
  friend: User
  messages: Message[]
}

export const FriendChat = ({ friend, messages }: Props) => {
  return (
    <>
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
              message.to === friend.userid ? '1rem 0 0 auto !important' : '1rem auto 0 0 !important'
            }
            maxW={'50%'}
            p={'0.5rem 1rem'}
          >
            {message.content}
          </Text>
        ))}
    </>
  )
}
