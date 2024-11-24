import { Center, Text, VStack, HStack, Checkbox, Image } from '@gluestack-ui/themed';
import { HomeHeader } from '@components/HomeHeader';

export function Exercise() {

  return (
    <>
      <HomeHeader showBackButton={true} title='Detalhes do Exercício' />
      
      <Center flex={1} px={4} bg="$gray600">
        <Image 
          source={{ uri: 'https://v4excellencefitness.com.br/wp-content/uploads/2023/05/Bicep-Alternado-Martelo1.png' }}
          alt='Imagem do exercício'
          resizeMode="cover"
          style={{ width: '80%', height: '50%', borderRadius: 10, marginBottom: 250 }}
        />
      </Center>
    </>
  );
}
