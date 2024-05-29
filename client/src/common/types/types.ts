import { Dispatch, SetStateAction } from 'react'

export type User = {
  connected: boolean
  id: string
  passhash: string
  userid: string
  username: string
}
export type Message = {
  content: string
  from: string
  to: string
}

export type MessagesContextType = {
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
}
export type FriendContextType = {
  friendList: User[]
  setFriendList: Dispatch<SetStateAction<User[]>>
}
