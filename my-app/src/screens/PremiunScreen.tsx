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

export function PremiunScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  function handleNext(){
    navigation.navigate("planosscreen");
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
            <Heading color="$white" fontSize={30} mb={20} textAlign='center'>
                Exclusividade da versão Premium
            </Heading>
          </Center>

         
          
          <Box title="Treine corretamente" variant="solid" mb={100} mt={50}>
          Temos diversos execícios com instruções para você treinar corretamente e otimizar seus resultados.
          </Box>

          <Box title="Parceiro de Treino" variant="solid" mb={100}>
          Métricas para você acompanhar seu desempenho durante o treino.
          </Box>

          <Box title="Treino Personalizado" variant="solid" mb={10}>
          Treino individualizados especialmente para você atingit seus objetivos.
          </Box>

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
