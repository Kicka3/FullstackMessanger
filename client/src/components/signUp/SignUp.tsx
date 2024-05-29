import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccountContext } from '@/appContext'
import { BASE_SERV_URL } from '@/common/constants/constants'
import { TextField } from '@/components/textField'
import { validationSchema } from '@/components/utils'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'

export const SignUp = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const setUserContext = useContext(AccountContext)

  if (!setUserContext) {
    return null
  }

  const { setUser } = setUserContext

  return (
    <Formik
      initialValues={{ password: '', username: '' }}
      onSubmit={(values, actions) => {
        const vals = { ...values }

        actions.resetForm()
        fetch(`${BASE_SERV_URL}/auth/signup`, {
          body: JSON.stringify(vals),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
          .catch(err => {
            console.error(err)

            return
          })
          .then(res => {
            if (!res || !res.ok || res.status >= 400) {
              return
            }

            return res.json()
          })
          .then(data => {
            if (!data) {
              return
            }
            setUser({ ...data })
            if (data.status) {
              setError(data.status)
            } else if (data.loggedIn) {
              navigate('/home')
            }
          })
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
