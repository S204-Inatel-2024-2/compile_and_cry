import React, { useState } from 'react';
import {
  Center,
  Heading,
  Image,
  ScrollView,
  VStack,
  Progress,
} from '@gluestack-ui/themed';

import BackgroundImg from '@assets/Backgroud.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from '@react-navigation/native';
import { Box } from '@components/Box';

export function MyProfileSix() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [progress, setProgress] = useState(0);

  function handleNext() {
    if (progress < 100) {
      setProgress(progress + 20);
      navigation.navigate("register")
    } else {
      navigation.goBack(); 
    }
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
        />

        <VStack flex={1} px="$10" pb="$16">

        <Center gap="$2" mt={30} mb={30}>
            <Heading color="$white">Meu Perfil</Heading>
            <Progress
              value={progress}
              w="$full"
              h="$3"
              mt="$4"
            />
          </Center>

          <Heading color="$orange500" fontSize={30} mb={20}>
            Deseja realizar exercícios de cardio?
          </Heading>

          <Heading color="$white" fontSize={15} mb={20}>
            Exercícios na esteira, bicicleta, elíptico e semelhantes.
          </Heading>

          <Box title="Incluir cardio nos treinos" variant="solid" mb={10}>
          Exercícios de cardio serão adicionados antes ou após os treinos.
          </Box>

          <Box title="Não desejo a inclusão do cardio" variant="solid" mb={10}>
          Exercícios de cardio não serão adicionados nos dias de treino.
          </Box>
          

          <Button
            title="Próximo"
            mt="$12"
            mb="$3"
            ml="$16"
            onPress={handleNext} 
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
