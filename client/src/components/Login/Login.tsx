import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccountContext } from '@/appContext'
import { BASE_SERV_URL } from '@/common/constants/constants'
import { Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { Form, Formik } from 'formik'

import { TextField } from '../textField/index.js'
import { validationSchema } from '../utils/index.js'

export const Login = () => {
  const [error, setError] = useState<null | string>(null)

  const navigate = useNavigate()
  const accountContext = useContext(AccountContext)

  if (!accountContext) {
    return null
  }

  const { setUser } = accountContext

  return (
    <Formik
      initialValues={{ password: '', username: '' }}
      onSubmit={async (values, actions) => {
        const vals = { ...values }

        actions.resetForm()

        try {
          const response = await axios.post(`${BASE_SERV_URL}/auth/login`, vals, {
            withCredentials: true,
          })

          if (response.status >= 400) {
            setError('Invalid username or password')

            return
          }

          setUser({ ...response.data })

          if (!response.status) {
            setError(response.data.status)
          } else if (response.data.loggedIn) {
            navigate('/home')
          }
        } catch (error) {
          console.error('Error during login:', error)
          setError('Failed to log in. Please try again later.')
        }
      }}
      validationSchema={validationSchema}
    >
      <VStack
        as={Form}
        h={'100vh'}
        justify={'center'}
        m={'auto'}
        spacing={'1rem'}
        w={{ base: '90%', md: '500px' }}
      >
        <Heading>Log In</Heading>
        <Text as={'p'} color={'red.500'}>
          {error}
        </Text>
        <TextField
          autoComplete={'off'}
          label={'Username'}
          name={'username'}
          placeholder={'Enter username'}
        />

        <TextField
          autoComplete={'off'}
          label={'Password'}
          name={'password'}
          placeholder={'Enter password'}
          type={'password'}
        />

        <ButtonGroup pt={'1rem'}>
          <Button colorScheme={'teal'} type={'submit'}>
            Log In
          </Button>
          <Button onClick={() => navigate('/register')}>Create Account</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  )
}
