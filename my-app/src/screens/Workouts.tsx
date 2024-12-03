import React, { useEffect, useState } from 'react';
import { ExerciseCard } from '@components/ExerciseCard';
import { HomeHeader } from '@components/HomeHeader';
import { Center, Divider, Text, ScrollView } from '@gluestack-ui/themed'; // Importar ScrollView
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Workouts() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [exercises, setExercises] = useState<{ name: string; description: string }[]>([]);

  useEffect(() => {
    // Função para recuperar os dados do AsyncStorage
    async function fetchExercises() {
      try {
        const savedExercises = await AsyncStorage.getItem('@exercises');
        console.log('Dados recuperados do AsyncStorage:', savedExercises); // Verifique o formato dos dados

        if (savedExercises !== null) {
          // Se os exercícios foram salvos no AsyncStorage, converta para JSON
          const exercisesData = JSON.parse(savedExercises);
          console.log('Exercícios convertidos:', exercisesData); // Verifique os dados após a conversão
          setExercises(exercisesData); // Atualiza o estado com os dados recuperados
        }
      } catch (error) {
        console.error('Erro ao recuperar exercícios:', error);
      }
    }

    fetchExercises();
  }, []);

  function handleToExercise() {
    navigation.navigate('exercise');
  }

  return (
    <>
      <HomeHeader showBackButton={true} title="Treino Personalizado" />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}> {/* ScrollView envolve o conteúdo */}
        <Center>
          <Text pb={20} mt={40} color="white">
            Exercícios
          </Text>
        </Center>
        <Divider bg="$gray400" mb={20} />
        <Center>
          {exercises.length === 0 ? (
            <Text color="white">Nenhum exercício disponível</Text> // Caso não haja exercícios
          ) : (
            exercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                onPress={handleToExercise}
                title={exercise.name} // Usando o name como title
                variant="solid"
                mb={20}
                children={exercise.description} // Usando description como children
                imageUrl="https://v4excellencefitness.com.br/wp-content/uploads/2023/05/Bicep-Alternado-Martelo1.png"
              />
            ))
          )}
        </Center>
      </ScrollView>
    </>
  );
}
