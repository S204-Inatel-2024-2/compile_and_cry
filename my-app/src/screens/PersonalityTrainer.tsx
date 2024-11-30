import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import BackgroundImg from '@assets/Backgroud.png';
import Logo from '@assets/Logo.png'; // If Logo is an image, use Image component
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from '@react-navigation/native';

export function PersonalityTrainer() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccont(){
      navigation.navigate("myprofiletwo")
  }

  return (
    <VStack flex={1}>
      <VStack flex={1}>
        <Image
          w="$full"
          h="$full"
          source={BackgroundImg}
          alt="Pessoas na academia"
          position="absolute"
          opacity={0.5}
        />

        <VStack flex={1} px="$10" pb="$16">
  
          <Heading color="$orange500" fontSize={33} marginTop={100}>Treino personalizado para VOCÊ!</Heading>
          <Heading color="$white" marginTop={100}>Com base nos seus objetivos e necessidades, vamos desenvolver um programa de treino exclusivo!</Heading>
          <Heading color="$white" marginTop={100}>Você terá a liberdade de editá-lo ou até criar seus próprios treinos.</Heading>

          <Button
            title="Próximo"
            mt="$12"
            mb="$3"
            ml="$16"
            position="absolute"
            bottom={0}
            left="50%"
            transform="translateX(-70%)"
            onPress={handleNewAccont} />
        </VStack>
      </VStack>
    </VStack>
  );
}
