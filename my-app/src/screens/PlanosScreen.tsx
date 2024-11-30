import React from 'react';
import {
  Center,
  Heading,
  Image,
  VStack,
} from '@gluestack-ui/themed';

import BackgroundImg from '@assets/Backgroud.png';
import { Button } from '@components/Button';
import { Box } from '@components/Box';
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from '@react-navigation/native';

export function PlanosScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  // Função para navegação para a versão Premium
  function handleNext() {
    navigation.navigate("premiumscreendetail"); // Nome da tela para versão Premium
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
            <Heading color="$white" fontSize={30} mb={5} textAlign='center'>
              Melhore seu treino!
            </Heading>
            <Heading color="$white" textAlign='center'>
              Junte-se a mais de 500 usuários e transforme seu corpo.
            </Heading>
          </Center>

          {/* Opções de Planos */}
          <Center>
            <Box title="12 meses" variant="outline" mb={30} mt={100} onPress={handleNext}>
              R$ 139,90/ano
            </Box>

            <Box title="6 meses" variant="outline" mb={30} onPress={handleNext}>
              R$ 99/mês
            </Box>

            <Box title="1 mês" variant="outline" mb={10} onPress={handleNext}>
              R$ 49,90/mês
            </Box>
          </Center>

          {/* Botão Continuar */}
          <Button
            title="Continuar"
            mt="$12"
            mb="$3"
            ml="$16"
            position="absolute"
            bottom={0}
            left="50%"
            transform="translateX(-70%)"
            onPress={handleNext} 
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
