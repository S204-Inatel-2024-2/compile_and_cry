import React, { useState } from 'react';
import {
  Center,
  Heading,
  Image,
  VStack,
  Progress,
} from '@gluestack-ui/themed';

import BackgroundImg from '@assets/Backgroud.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from '@react-navigation/native';

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    sex: '',
    birthDate: '',
    weight: '',
    height: '',
    weightGoal: '',
  });

  const handleNext = () => {
    if (progress < 100) {
      setProgress(progress + 20);
      navigation.navigate("personalityTrainer");
    } else {
      navigation.goBack(); 
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <VStack flex={1}>
      <Image
        w="$full"
        h="$full"
        source={BackgroundImg}
        alt="Pessoas na academia"
        position="absolute"
      />

      <VStack flex={1} px="$10" pb="$16">
        <Center flex={1} gap="$2">
          <Heading color="$white">Meu Perfil</Heading>
          <Progress
            value={progress}
            w="$full"
            h="$3"
            mt="$4"
          />
        </Center>

        <Heading color="$orange500" fontSize={30}>
          Quais são suas métricas corporais?
        </Heading>

        <Heading color="$orange500" fontSize={15}>Sexo</Heading>
        <Input
          placeholder="Selecione o sexo"
          value={formData.sex}
          onChangeText={(text) => handleChange('sex', text)}
        />

        <Heading color="$orange500" fontSize={15}>Data de Nascimento</Heading>
        <Input
          placeholder="DD/MM/AA"
          value={formData.birthDate}
          onChangeText={(text) => handleChange('birthDate', text)}
        />

        <Heading color="$orange500" fontSize={15}>Peso</Heading>
        <Input
          placeholder="Peso em kg"
          value={formData.weight}
          onChangeText={(text) => handleChange('weight', text)}
        />

        <Heading color="$orange500" fontSize={15}>Altura</Heading>
        <Input
          placeholder="Altura em cm"
          value={formData.height}
          onChangeText={(text) => handleChange('height', text)}
        />

        <Heading color="$orange500" fontSize={15}>Meta de peso</Heading>
        <Input
          placeholder="Meta de peso em kg"
          value={formData.weightGoal}
          onChangeText={(text) => handleChange('weightGoal', text)}
        />

        <Button
          title="Próximo"
          mt="$12"
          mb="$3"
          ml="$16"
          onPress={handleNext}
        />
      </VStack>
    </VStack>
  );
}
