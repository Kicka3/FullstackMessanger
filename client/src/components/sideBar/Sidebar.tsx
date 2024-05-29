import { useContext } from 'react'

import { AddFriendModal } from '@/components/addFriend'
import { FriendContext } from '@/components/homePage'
import { ChatIcon } from '@chakra-ui/icons'
import {
  Button,
  Circle,
  Divider,
  HStack,
  Heading,
  Tab,
  TabList,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

export const Sidebar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const friendListContext = useContext(FriendContext)

  if (!friendListContext) {
    return null
  }

  const { friendList } = friendListContext

  return (
    <>
      <VStack py={'1.4rem'}>
        <HStack justify={'space-evenly'} w={'100%'}>
          <Heading size={'md'}>Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList}>
          {friendList.map(friend => (
            <HStack as={Tab} key={`friend:${friend}`}>
              <Circle bg={friend.connected ? 'green.700' : 'red.500'} size={'12px'} />
              <Text>{friend.username}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
