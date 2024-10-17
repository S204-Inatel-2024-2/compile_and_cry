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

export function PlanosScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  function handleNext(){
    navigation.navigate("home");
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
            <Heading color="$white" textAlign='center'>Junte-se a mais de 500 usuários e transforme seu corpo.</Heading>
          </Center>

          

          <Center>
          <Box title="12 meses" variant="outline" mb={10}>
          R$ 139,90/ano
          </Box>

          <Box title="6 meses" variant="outline" mb={10}>
          R$ 99/mês
          </Box>

          <Box title="1 mês" variant="outline" mb={10}>
          R$ 49,90/mês
          </Box>
          </Center>
          
          

          <Button
            title="Continuar"
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
