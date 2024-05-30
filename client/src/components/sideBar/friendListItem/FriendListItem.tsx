import { User } from '@/common/types'
import { Circle, HStack, Tab, Text } from '@chakra-ui/react'

type Props = {
  friendList: User[]
}

export const FriendListItem = ({ friendList }: Props) => {
  const stringToBoolean = (value: boolean | string): boolean => {
    if (typeof value === 'string') {
      return value === 'true'
    }

    return value
  }

  return (
    <>
      {friendList.map((friend, index) => (
        <HStack as={Tab} key={index}>
          <Circle bg={stringToBoolean(friend.connected) ? 'green.700' : 'red.500'} size={'12px'} />
          <Text>{friend.username}</Text>
        </HStack>
      ))}
    </>
  )
}
