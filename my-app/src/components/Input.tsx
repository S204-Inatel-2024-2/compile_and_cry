import { Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField>

export function Input({ ...props }: Props) {
  return (
    <GluestackInput
      bg="$white"
      h="$16"
      w='$80'
      px="$4"
      borderWidth="$0"
      borderRadius="$xl"
      $focus={{
        borderWidth: 1,
        borderColor: "$gray700"
      }}
    >
      <InputField
        color="$black"
        fontFamily="$body"
        placeholderTextColor="$black"
        {...props}
      />
    </GluestackInput>
  )
}