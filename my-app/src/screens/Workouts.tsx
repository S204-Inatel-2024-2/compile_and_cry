import React, { useEffect, useState } from 'react';
import { ExerciseCard } from '@components/ExerciseCard';
import { HomeHeader } from '@components/HomeHeader';
import { Center, Divider, Text, ScrollView } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mapa de imagens
// Mapa de imagens para exercícios
const exerciseImages: Record<string, string> = {
  "Corrida": "https://v4excellencefitness.com.br/wp-content/uploads/2023/05/Bicep-Alternado-Martelo1.png",
  "Burpees": "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpg",
  "Pular Corda": "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpg",
  "Bicicleta": "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpgg",
  "Polichinelo": "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpg",
  "Flexão": "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpg",
  "Agachamento": "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpg",
  "Supino": "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpg",
  "Crucifixo": "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpg",
  "Leg Press": "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpg",
  default: "https://static1.minhavida.com.br/articles/97/75/46/e7/supino-inclinado-com-barrashutterstock-article-1.jpg", // Imagem padrão
};


export function Workouts() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [exercises, setExercises] = useState<{ name: string; description: string }[]>([]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const savedExercises = await AsyncStorage.getItem('@exercises');
        console.log('Dados recuperados do AsyncStorage:', savedExercises);

        if (savedExercises !== null) {
          const exercisesData = JSON.parse(savedExercises);
          console.log('Exercícios convertidos:', exercisesData);
          setExercises(exercisesData);
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
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Center>
          <Text pb={20} mt={40} color="white">
            Exercícios
          </Text>
        </Center>
        <Divider bg="$gray400" mb={20} />
        <Center>
          {exercises.length === 0 ? (
            <Text color="white">Nenhum exercício disponível</Text>
          ) : (
            exercises.map((exercise, index) => {
              // Obter a imagem correspondente ou usar a imagem padrão
              const imageUrl = exerciseImages[exercise.name] || exerciseImages.default;
              return (
                <ExerciseCard
                  key={index}
                  onPress={handleToExercise}
                  title={exercise.name}
                  variant="solid"
                  mb={20}
                  children={exercise.description}
                  imageUrl={imageUrl} // Define a imagem dinâmica
                />
              );
            })
          )}
        </Center>
      </ScrollView>
    </>
  );
}
