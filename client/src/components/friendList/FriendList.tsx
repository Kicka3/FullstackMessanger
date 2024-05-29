import { useEffect, useState } from 'react'

import axios from 'axios'

export const FriendsList = () => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    // Загрузка списка друзей при монтировании компонента
    fetchFriends()
  }, [])

  const fetchFriends = async () => {
    const response = await axios.get('/friends') // Укажите путь к вашему маршруту друзей

    setFriends(response.data)
  }

  const removeFriend = async friendId => {
    try {
      await axios.delete(`/friends/${friendId}`)
      // Обновление списка друзей после удаления
      fetchFriends()
    } catch (error) {
      console.error('Error removing friend:', error)
    }
  }

  return (
    <div>
      <h2>Friends List</h2>
      {friends.map(friend => (
        <div key={friend.id}>
          {friend.name}
          <button onClick={() => removeFriend(friend.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}
