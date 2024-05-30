import * as Yup from 'yup'

export const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password required!')
    .min(4, 'Password too short!')
    .max(28, 'Password too long!'),
  username: Yup.string()
    .required('Username required!')
    .min(4, 'Username too short!')
    .max(28, 'Username too long!'),
})

export const addFriendsValidationSchema = Yup.object({
  friendName: Yup.string()
    .required('Username is required!')
    .min(4, 'Invalid username')
    .max(28, 'Invalid username'),
})

export const messageValidationSchema = Yup.object({
  message: Yup.string()
    .required('Message is required!')
    .min(1, 'Message must not be empty!')
    .max(255, 'Message too long!'),
})
