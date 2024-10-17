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

export function MyProfileFive() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [progress, setProgress] = useState(0);

  function handleNext() {
    if (progress < 100) {
      setProgress(progress + 20);
      navigation.navigate("myprofilesix");
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
            Academia com equipamentos simples, como barras ehalteres.
          </Heading>
          
          <Box title="Academia simples" variant="solid" mb={10}>
          Academia com equipamentos simples, como barras ehalteres.
          </Box>

          <Box title="Academia avançada" variant="solid" mb={10}>
          Academia completa, equipada com todos os equipamentos necessários.
          </Box>

          <Box title="Casa/externo" variant="solid" mb={10}>
          Local onde não há nenhum equipamento expecífico para realização de atividade física.
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
