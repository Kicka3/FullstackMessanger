import { useContext } from 'react'

import { socket } from '@/common/socket'
import { MessagesContext } from '@/components/homePage'
import { messageValidationSchema } from '@/components/utils'
import { Button, HStack, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'

type Props = {
  userid: string
}

export const ChatBox = ({ userid }: Props) => {
  const messagesContext = useContext(MessagesContext)

  if (!messagesContext) {
    return null
  }

  const { setMessages } = messagesContext

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, actions) => {
        const message = { content: values.message, from: userid, to: userid }

        socket.emit('dm', message)
        setMessages(prevMsgs => [message, ...prevMsgs])
        actions.resetForm()
      }}
      validationSchema={messageValidationSchema}
    >
      <HStack as={Form} pb={'1.4rem'} px={'1.4rem'} w={'100%'}>
        <Input
          as={Field}
          autoComplete={'off'}
          name={'message'}
          placeholder={'Type message here..'}
          size={'lg'}
        />
        <Button colorScheme={'teal'} size={'lg'} type={'submit'}>
          Send
        </Button>
      </HStack>
    </Formik>
  )
}
