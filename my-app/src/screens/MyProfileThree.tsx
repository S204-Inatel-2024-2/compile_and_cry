import React, { useState } from 'react';
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

  function handleNext() {
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
          
          <HStack flexWrap="wrap" justifyContent="space-between" mb={10}>
  <Box title="Balanceado" variant="outline" width="100%" mb={4}>
  </Box>

  <Box title="Peito" variant="outline" width="100%" mb={4}>
  </Box>

  <Box title="Costa" variant="outline" width="100%" mb={4}>
  </Box>

  <Box title="Braços" variant="outline" width="100%" mb={4}>
  </Box>

  <Box title="Pernas" variant="outline" width="100%" mb={4}>
  </Box>

  <Box title="Abdômen" variant="outline" width="100%" mb={4}>
  </Box>

  <Box title="Glúteos" variant="outline" width="100%" mb={4}>
  </Box>
</HStack>


          

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
