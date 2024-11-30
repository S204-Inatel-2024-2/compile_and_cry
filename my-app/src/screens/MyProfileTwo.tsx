import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Center,
  Heading,
  Image,
  VStack,
  Progress,
  ScrollView,
} from '@gluestack-ui/themed';

import BackgroundImg from '@assets/Backgroud.png';
import { Box } from '@components/Box';
import { Button } from '@components/Button';

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from '@react-navigation/native';

export function MyProfiletwo() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [progress, setProgress] = useState(0);
  const [objective, setObjective] = useState('');

  const handleNext = () => {
    if (!objective) {
      // Show alert or log an error if no objective is selected
      alert('Por favor, selecione um objetivo para continuar.');
      return;
    }

    if (progress < 100) {
      setProgress(progress + 20);
      navigation.navigate("myprofilethree");
    } else {
      navigation.goBack(); 
    }
  };

  const handleObjectiveSelection = async (selectedObjective: string) => {
    try {
      setObjective(selectedObjective);
      await AsyncStorage.setItem('@objective', selectedObjective); // Salvar no AsyncStorage
      console.log('Objetivo salvo no AsyncStorage:', selectedObjective);
    } catch (error) {
      console.error('Erro ao salvar o objetivo:', error);
    }
  };

  const getBoxStyle = (selectedObjective: string) => {
    return selectedObjective === objective
      ? { backgroundColor: '#f97316' } 
      : {}; // Cor padrão (sem alteração)
  };

  return (
    <VStack flex={1} position="relative">
      <Image
        w="$full"
        h="$full"
        source={BackgroundImg}
        alt="Pessoas na academia"
        position="absolute"
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
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
            Qual é o seu objetivo?
          </Heading>

          <Box
            title="Hipertrofia"
            variant="solid"
            mb={10}
            onPress={() => handleObjectiveSelection('hipertrofia')}
            style={getBoxStyle('hipertrofia')} // Aplica o estilo se for o objetivo selecionado
          >
            Aumento do volume muscular.
          </Box>

          <Box
            title="Definição Muscular"
            variant="solid"
            mb={10}
            onPress={() => handleObjectiveSelection('definicao muscular')}
            style={getBoxStyle('definicao muscular')}
          >
            Redução da gordura corporal.
          </Box>

          <Box
            title="Emagrecer"
            variant="solid"
            onPress={() => handleObjectiveSelection('emagrecer')}
            style={getBoxStyle('emagrecer')}
          >
            Redução da gordura corporal total.
          </Box>
        </VStack>
      </ScrollView>

      {/* Fix the "Próximo" button at the bottom */}
      <Button
        title="Próximo"
        mt="$12"
        mb="$3"
        ml="$16"
        position="absolute"
        bottom={0}
        left="50%"
        transform="translateX(-70%)"
        onPress={handleNext}
        disabled={!objective} // Disable the button if no objective is selected
      />
    </VStack>
  );
}
