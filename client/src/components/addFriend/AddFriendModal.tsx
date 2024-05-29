import { useCallback, useContext, useState } from 'react'

import { socket } from '@/common/socket'
import { User } from '@/common/types'
import { FriendContext } from '@/components/homePage'
import { TextField } from '@/components/textField'
import { addFriendsValidationSchema } from '@/components/utils'
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type AddFriendResponse = { done: boolean; errorMsg?: string; newFriend?: User }

export const AddFriendModal = ({ isOpen, onClose }: Props) => {
  const [error, setError] = useState('')
  const closeModal = useCallback(() => {
    setError('')
    onClose()
  }, [onClose])

  const friendContext = useContext(FriendContext)

  if (!friendContext) {
    return null
  }

  const { setFriendList } = friendContext

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: '' }}
          onSubmit={values => {
            socket.emit('add_friend', values.friendName, (response: AddFriendResponse) => {
              if (response.done) {
                setFriendList(c => [response.newFriend!, ...c])
                closeModal()

                return
              }
              setError(response.errorMsg!)
            })
          }}
          validationSchema={addFriendsValidationSchema}
        >
          <Form>
            <ModalBody>
              <Heading color={'red.500'} fontSize={'xl'} textAlign={'center'}>
                {error}
              </Heading>
              <TextField
                autoComplete={'off'}
                label={"Friend's name"}
                name={'friendName'}
                placeholder={"Enter friend's username.."}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme={'blue'} type={'submit'}>
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  )
}
