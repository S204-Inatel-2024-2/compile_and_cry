import React, { useState } from 'react';
import { Button } from '@components/Button';
import { HomeHeader } from '@components/HomeHeader';
import { WorkoutBox } from '@components/WorkoutBox';
import { Center, Divider, Heading, VStack, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

// Definindo o tipo de objetivos possíveis
type Objective = 'Perda de Peso' | 'Ganho de Massa Muscular' | 'hipertrofia';

export function Home() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleWorkout() {
    navigation.navigate("workouts");
  }

  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [workoutName, setWorkoutName] = useState<string>(''); // Estado para armazenar o nome do treino
  const [objective, setObjective] = useState<Objective | null>(null); // Estado para armazenar o objetivo
  const [workoutCreated, setWorkoutCreated] = useState(false); // Estado para verificar se o workout foi criado
  const [hasWorkout, setHasWorkout] = useState(false); 

  // Função para pegar o token de autenticação
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      return token;
    } catch (error) {
      console.error('Erro ao obter token de autenticação:', error);
      return null;
    }
  };

  // Função para pegar as preferências do usuário do AsyncStorage
  const getUserPreferences = async () => {
    try {
      const cardio = await AsyncStorage.getItem('@selectedCardio');
      const gym = await AsyncStorage.getItem('@selectedGym');
      const experience = await AsyncStorage.getItem('@selectedExperience');
      const groups = await AsyncStorage.getItem('@selectedGroups');

      console.log("Cardio:", cardio);
      console.log("Gym:", gym);
      console.log("Experience:", experience);
      console.log("Groups:", groups);
      AsyncStorage.getAllKeys().then(keys => console.log("Chaves armazenadas:", keys));

      
      return {
        cardio: cardio === 'true', // Supondo que as seleções sejam booleanas
        gym: gym,
        experience: experience,
        groups: JSON.parse(groups || '[]'), // Assumindo que é uma lista de grupos musculares
      };
    } catch (error) {
      console.error('Erro ao obter preferências:', error);
      return null;
    }
  };

  

  // Função para selecionar os exercícios com base nas preferências do usuário
  async function getExercisesForPreferences() {
    const preferences = await getUserPreferences();

    if (!preferences) {
      return [];
    }

    const { cardio, gym, experience, groups } = preferences;
    const exercises = [];

    if (cardio) {
      exercises.push(
        { name: 'Corrida', description: 'Exercício cardio simples', difficulty: 'BEGINNER', requires_equipment: false },
        { name: 'Burpees', description: 'Exercício cardio intenso', difficulty: 'INTERMEDIATE', requires_equipment: false }
      );
    }

    if (gym === 'home') {
      exercises.push(
        { name: 'Flexão', description: 'Exercício de peito', difficulty: 'BEGINNER', requires_equipment: false },
        { name: 'Agachamento', description: 'Exercício de pernas', difficulty: 'INTERMEDIATE', requires_equipment: false }
      );
    } else if (gym === 'gym') {
      exercises.push(
        { name: 'Supino', description: 'Exercício de peito', difficulty: 'INTERMEDIATE', requires_equipment: true },
        { name: 'Puxada', description: 'Exercício para costas', difficulty: 'INTERMEDIATE', requires_equipment: true }
      );
    }

    if (experience === 'beginner') {
      exercises.push(
        { name: 'Flexão', description: 'Exercício para iniciantes', difficulty: 'BEGINNER', requires_equipment: false },
        { name: 'Abdominais', description: 'Exercício de core', difficulty: 'BEGINNER', requires_equipment: false }
      );
    } else if (experience === 'intermediate') {
      exercises.push(
        { name: 'Remada', description: 'Exercício para costas', difficulty: 'INTERMEDIATE', requires_equipment: true },
        { name: 'Agachamento com peso', description: 'Exercício de pernas', difficulty: 'INTERMEDIATE', requires_equipment: true }
      );
    } else if (experience === 'advanced') {
      exercises.push(
        { name: 'Levantamento Terra', description: 'Exercício de força', difficulty: 'ADVANCED', requires_equipment: true },
        { name: 'Puxada com pesos', description: 'Exercício de costas', difficulty: 'ADVANCED', requires_equipment: true }
      );
    }

    if (groups.includes('Peito')) {
      exercises.push({ name: 'Supino', description: 'Exercício de peito', difficulty: 'INTERMEDIATE', requires_equipment: true });
    }

    if (groups.includes('Pernas')) {
      exercises.push({ name: 'Agachamento', description: 'Exercício de pernas', difficulty: 'INTERMEDIATE', requires_equipment: true });
      
    }

    if (groups.includes('Braços')) {
      exercises.push({ name: 'teste1', description: 'test1', difficulty: 'INTERMEDIATE', requires_equipment: true });
      exercises.push({ name: 'teste2', description: 'teste2', difficulty: 'INTERMEDIATE', requires_equipment: true });
      exercises.push({ name: 'teste3', description: 'teste3', difficulty: 'INTERMEDIATE', requires_equipment: true });
    }

    return exercises.slice(0, 10);
  }

  // Função para criar a rotina de treino
  async function createWorkoutRoutine() {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('@token');

      if (!token) {
        alert("Você precisa estar logado para criar uma rotina.");
        return;
      }

      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Obter o userId através da rota /me
      const userResponse = await api.get('/me');
      const userId = userResponse.data.user.id;
      const userObjective = userResponse.data.user.objective;
      setObjective(userObjective);

      if (!userId) {
        alert('Você precisa estar logado para criar uma rotina.');
        return;
      }

      // Criar a rotina de treino
      const workoutResponse = await api.post(`/workout/${userId}/workouts`, {
        name: 'Treino Personalizado', // Nome do treino
        objective: userObjective
      });
      

      const workoutId = workoutResponse.data.Workout.id_workout;
      setWorkoutName(workoutResponse.data.Workout.name);

      console.log("Id do treino:", workoutId)
      
      

      // Obter a lista de exercícios baseados nas preferências
      const exerciseData = await getExercisesForPreferences();
      
      const preferences = await getUserPreferences();
      




      const exercisePromises = exerciseData.map(exercise =>
        api.post('/exercises', exercise)
      );





      const exerciseResponses = await Promise.all(exercisePromises);
      const exerciseIds = exerciseResponses.map(response => response.data.Exercise.id_exercise);

      // Salvar exercícios no AsyncStorage
      const exercises = exerciseResponses.map(response => ({
        name: response.data.Exercise.name,
        description: response.data.Exercise.description
      }));

      await AsyncStorage.setItem('@exercises', JSON.stringify(exercises));
      console.log('Exercícios salvos com sucesso');

      // Relacionar os exercícios com o workout
      const relationPromises = exerciseIds.map(exerciseId =>
        api.post(`/workoutExercise/${exerciseId}/${workoutId}`, {
          series: 3,         // Número de séries
          repetitions: 12,   // Número de repetições por série
          rest: 60           // Tempo de descanso em segundos
        })
        // .then(response => {
        //   console.log(`Post para o exercício ${exerciseId} foi bem-sucedido!`);
        //   return response;
        // })
        // .catch(error => {
        //   console.error(`Erro ao criar workoutExercise para o exercício ${exerciseId}:`, error);
        // })
        
      );

      await Promise.all(relationPromises);

      
      alert('Rotina de treino criada com sucesso!');
      setWorkoutCreated(true); // Marca que a rotina foi criada com sucesso

    } catch (error) {
      console.error('Erro ao criar rotina:', error.response || error.message);
      alert('Erro ao criar rotina de treino. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack flex={1} bg="$gray800">
      {/* Cabeçalho da Home */}
      <HomeHeader
        title="Treinos"
        userPhotoUri="https://github.com/luanrobert07.png" // Foto do usuário (você pode substituir isso por algo dinâmico)
      />

      <Divider bg="$gray400" />

      {/* Título */}
      <Heading
        color="$white"
        fontSize="$3xl"
        alignItems="center"
        ml="$12"
        mt="$12"
      >
        Meu Plano
      </Heading>

      {/* Box de treino */}
      {workoutCreated && (
        <WorkoutBox
          onPress={handleWorkout}
          title={workoutName} 
          variant="solid"
          mb={10}
          mt={20}
          ml={20}
          progress={75}
        >
          <Text color="$gray200">{objective}</Text> 
        </WorkoutBox>
      )}

      {/* Botão para criar rotina */}
      <Button
        title={loading ? "Criando..." : "Criar uma nova rotina de treino"}
        mt="$12"
        mb="$3"
        ml="$16"
        position="absolute"
        bottom={0}
        left="50%"
        transform="translateX(-70%)"
        variant="outline"
        onPress={createWorkoutRoutine}
        isDisabled={loading}
      />
    </VStack>
  );
}
