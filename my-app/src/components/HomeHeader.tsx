import { Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed'
import { UserPhoto } from './UserPhoto'
import { LogOut } from 'lucide-react-native'

export function HomeHeader() {
  return (
    <HStack bg="$gray600" pt="$8"  px="$8" pb="$56" alignItems="center" gap='$4'>
      
      <VStack flex={1}>
        <Text color="$white" fontSize="$3xl" alignItems='center'>
          Treinos
        </Text>
      </VStack>
      <UserPhoto source={{ uri: 'https://github.com/luanrobert07.png'}} w='$16' h='$16' alt='Imagem do usuário' />
      <Icon as={LogOut} color='$gray200' size='xl' />
    </HStack>
  )
}