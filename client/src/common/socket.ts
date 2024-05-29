import { BASE_SERV_URL } from '@/common/constants/constants'
import { io } from 'socket.io-client'

export const socket = io(`${BASE_SERV_URL}`, {
  autoConnect: false,
  withCredentials: true,
})
