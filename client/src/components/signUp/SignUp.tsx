import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccountContext } from '@/appContext'
import { BASE_SERV_URL } from '@/common/constants/constants'
import { TextField } from '@/components/textField'
import { validationSchema } from '@/components/utils'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { Form, Formik } from 'formik'

export const SignUp = () => {
  const [error, setError] = useState<null | string>(null)
  const navigate = useNavigate()

  const setUserContext = useContext(AccountContext)

  if (!setUserContext) {
    return null
  }

  const { setUser } = setUserContext

  return (
    <Formik
      initialValues={{ password: '', username: '' }}
      onSubmit={async (values, actions) => {
        const vals = { ...values }

        actions.resetForm()

        try {
          const response = await axios.post(`${BASE_SERV_URL}/auth/signup`, vals, {
            withCredentials: true,
          })

          if (!response.data) {
            return
          }

          if (response.data.status >= 400) {
            setError('Username already exists or other registration error')

            return
          }

          setUser({ ...response.data })

          if (response.data.status) {
            setError(response.data.status)
          } else if (response.data.loggedIn) {
            navigate('/home')
          }
        } catch (error) {
          console.error('Error during sign up:', error)
          setError('Failed to create account. Please try again later.')
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
        <Heading>Sign Up</Heading>
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
            Create Account
          </Button>
          <Button leftIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
            Back
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  )
}
