import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Center,
  Heading,
  Image,
  VStack,
  Progress,
} from '@gluestack-ui/themed';

import BackgroundImg from '@assets/Backgroud.png';
import { Button } from '@components/Button';
import { Box } from '@components/Box';

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from '@react-navigation/native';

export function MyProfileSix() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [progress, setProgress] = useState(0);
  const [selectedCardio, setSelectedCardio] = useState<string>(''); // Track selected cardio preference

  useEffect(() => {
    // Load selected cardio preference from AsyncStorage when the component mounts
    const loadSelectedCardio = async () => {
      const storedCardio = await AsyncStorage.getItem('@selectedCardio');
      if (storedCardio) {
        setSelectedCardio(storedCardio);
      }
    };

    loadSelectedCardio();
  }, []);

  // Function to handle cardio selection
  const handleCardioSelection = async (cardio: string) => {
    setSelectedCardio(cardio);
    // Save the selected cardio preference in AsyncStorage
    await AsyncStorage.setItem('@selectedCardio', cardio);
  };

  // Function to get the style of the box based on selection
  const getBoxStyle = (cardio: string) => {
    return selectedCardio === cardio ? { backgroundColor: '#f97316' } : {}; // Highlight if selected
  };

  // Function to handle next button press
  function handleNext() {
    if (!selectedCardio) {
      alert('Por favor, selecione sua preferência de cardio.');
      return;
    }

    if (progress < 100) {
      setProgress(progress + 20);
      navigation.navigate("register");
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

          {/* Cardio Type Selection */}
          <Box
            title="Incluir cardio nos treinos"
            variant="solid"
            mb={10}
            onPress={() => handleCardioSelection('Incluir cardio nos treinos')}
            style={getBoxStyle('Incluir cardio nos treinos')} // Apply style if selected
          >
            Exercícios de cardio serão adicionados antes ou após os treinos.
          </Box>

          <Box
            title="Não desejo a inclusão do cardio"
            variant="solid"
            mb={10}
            onPress={() => handleCardioSelection('Não desejo a inclusão do cardio')}
            style={getBoxStyle('Não desejo a inclusão do cardio')} // Apply style if selected
          >
            Exercícios de cardio não serão adicionados nos dias de treino.
          </Box>

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
            disabled={!selectedCardio} // Disable button if no cardio preference is selected
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
