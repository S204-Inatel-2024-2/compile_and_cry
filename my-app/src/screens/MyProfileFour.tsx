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

export function MyProfileFour() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [progress, setProgress] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState<string>(''); // Track selected experience level

  useEffect(() => {
    // Load selected experience level from AsyncStorage when the component mounts
    const loadSelectedExperience = async () => {
      const storedExperience = await AsyncStorage.getItem('@selectedExperience');
      if (storedExperience) {
        setSelectedExperience(storedExperience);
      }
    };

    loadSelectedExperience();
  }, []);

  // Function to handle experience level selection
  const handleExperienceSelection = async (experience: string) => {
    setSelectedExperience(experience);
    // Save the selected experience in AsyncStorage
    await AsyncStorage.setItem('@selectedExperience', experience);
  };

  // Function to get the style of the box based on selection
  const getBoxStyle = (experience: string) => {
    return selectedExperience === experience ? { backgroundColor: '#f97316' } : {}; // Highlight if selected
  };

  // Function to handle next button press
  function handleNext() {
    if (!selectedExperience) {
      alert('Por favor, selecione seu nível de experiência.');
      return;
    }

    if (progress < 100) {
      setProgress(progress + 20);
      navigation.navigate("myprofilefive");
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
            Qual sua experiência praticando musculação?
          </Heading>

          {/* Experience Level Selection */}
          <Box
            title="Iniciante"
            variant="solid"
            mb={10}
            onPress={() => handleExperienceSelection('Iniciante')}
            style={getBoxStyle('Iniciante')} // Apply style if selected
          >
            Comecei a praticar com menos de 6 meses de experiência.
          </Box>

          <Box
            title="Intermediário"
            variant="solid"
            mb={10}
            onPress={() => handleExperienceSelection('Intermediário')}
            style={getBoxStyle('Intermediário')} // Apply style if selected
          >
            Pratico musculação há mais de 6 meses e menos de 2 anos.
          </Box>

          <Box
            title="Avançado"
            variant="solid"
            mb={10}
            onPress={() => handleExperienceSelection('Avançado')}
            style={getBoxStyle('Avançado')} // Apply style if selected
          >
            Pratico musculação há mais de 2 anos de forma consistente.
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
            disabled={!selectedExperience} // Disable button if no experience is selected
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
