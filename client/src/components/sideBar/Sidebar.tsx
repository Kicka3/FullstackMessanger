import { useContext } from 'react'

import { AddFriendModal } from '@/components/addFriend'
import { FriendContext } from '@/components/homePage'
import { FriendListItem } from '@/components/sideBar/friendListItem'
import { ChatIcon } from '@chakra-ui/icons'
import { Button, Divider, HStack, Heading, TabList, VStack, useDisclosure } from '@chakra-ui/react'

export const Sidebar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const friendListContext = useContext(FriendContext)

  if (!friendListContext) {
    return null
  }
  const { friendList } = friendListContext

  const onCloseModal = () => {
    onClose()
  }

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
          <FriendListItem friendList={friendList} />
        </VStack>
      </VStack>
      {isOpen && <AddFriendModal isOpen={isOpen} onClose={onCloseModal} />}
    </>
  )
}
