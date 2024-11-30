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

export function MyProfileFive() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [progress, setProgress] = useState(0);
  const [selectedGym, setSelectedGym] = useState<string>(''); // Track selected gym type

  useEffect(() => {
    // Load selected gym type from AsyncStorage when the component mounts
    const loadSelectedGym = async () => {
      const storedGym = await AsyncStorage.getItem('@selectedGym');
      if (storedGym) {
        setSelectedGym(storedGym);
      }
    };

    loadSelectedGym();
  }, []);

  // Function to handle gym type selection
  const handleGymSelection = async (gym: string) => {
    setSelectedGym(gym);
    // Save the selected gym type in AsyncStorage
    await AsyncStorage.setItem('@selectedGym', gym);
  };

  // Function to get the style of the box based on selection
  const getBoxStyle = (gym: string) => {
    return selectedGym === gym ? { backgroundColor: '#f97316' } : {}; // Highlight if selected
  };

  // Function to handle next button press
  function handleNext() {
    if (!selectedGym) {
      alert('Por favor, selecione o tipo de academia.');
      return;
    }

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
            Qual o tipo de academia que você frequenta?
          </Heading>

          {/* Gym Type Selection */}
          <Box
            title="Academia simples"
            variant="solid"
            mb={10}
            onPress={() => handleGymSelection('Academia simples')}
            style={getBoxStyle('Academia simples')} // Apply style if selected
          >
            Academia com equipamentos simples, como barras e halteres.
          </Box>

          <Box
            title="Academia avançada"
            variant="solid"
            mb={10}
            onPress={() => handleGymSelection('Academia avançada')}
            style={getBoxStyle('Academia avançada')} // Apply style if selected
          >
            Academia completa, equipada com todos os equipamentos necessários.
          </Box>

          <Box
            title="Casa/externo"
            variant="solid"
            mb={10}
            onPress={() => handleGymSelection('Casa/externo')}
            style={getBoxStyle('Casa/externo')} // Apply style if selected
          >
            Local onde não há nenhum equipamento específico para realização de atividade física.
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
            disabled={!selectedGym} // Disable button if no gym is selected
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
