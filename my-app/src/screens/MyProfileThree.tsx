import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Center,
  Heading,
  Image,
  ScrollView,
  VStack,
  Progress,
  HStack,
} from '@gluestack-ui/themed';

import BackgroundImg from '@assets/Backgroud.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from '@react-navigation/native';
import { Box } from '@components/Box';

export function MyProfileThree() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [progress, setProgress] = useState(0);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]); // Track selected muscle groups

  // Function to handle group selection
  const handleGroupSelection = async (group: string) => {
    setSelectedGroups(prevState => {
      const newSelection = prevState.includes(group)
        ? prevState.filter(item => item !== group) // Deselect if already selected
        : [...prevState, group]; // Select if not already selected

      // Save the updated selection in AsyncStorage
      AsyncStorage.setItem('@selectedGroups', JSON.stringify(newSelection));
      return newSelection;
    });
  };

  // Function to get the style of the box based on selection
  const getBoxStyle = (group: string) => {
    return selectedGroups.includes(group) ? { backgroundColor: '#f97316' } : {}; // Highlight if selected
  };

  // Function to handle button press
  function handleNext() {
    if (selectedGroups.length === 0) {
      alert('Por favor, selecione pelo menos um grupo muscular.');
      return;
    }

    if (progress < 100) {
      setProgress(progress + 20);
      navigation.navigate("myprofilefour");
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
            Quais são os grupos musculares deseja focar?
          </Heading>

          <Center>
            <HStack flexWrap="wrap" justifyContent="space-between" mb={10}>
              {['Balanceado', 'Peito', 'Costa', 'Braços', 'Pernas', 'Abdômen', 'Glúteos'].map((group) => (
                <Box
                  key={group}
                  title={group}
                  variant="outline"
                  mb={4}
                  ml={30}
                  onPress={() => handleGroupSelection(group)} // Handle group selection
                  style={getBoxStyle(group)} // Apply style if selected
                />
              ))}
            </HStack>
          </Center>
          

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
            disabled={selectedGroups.length === 0} // Disable button if no group selected
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
