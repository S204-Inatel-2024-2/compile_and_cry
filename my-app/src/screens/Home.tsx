import { Button } from '@components/Button'
import { HomeHeader } from '@components/HomeHeader'
import { Center, Text, VStack } from '@gluestack-ui/themed'

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />
      <Button
        title="Criar uma nova rotina de treino"
        mt="$96"
        mb="$3"
        ml="$16"
        variant='outline'
      />
    </VStack>
  )
}