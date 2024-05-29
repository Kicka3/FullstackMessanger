import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { Field, useField } from 'formik'

type Props = {
  autoComplete?: string
  label: string
  name: string
  placeholder?: string
  type?: string
}

export const TextField = ({ autoComplete = 'off', label, name, placeholder, ...props }: Props) => {
  const [field, meta] = useField({ name, ...props })

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input
        as={Field}
        {...field}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...props}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}
