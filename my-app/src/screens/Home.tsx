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

  // Função para criar a rotina de treino com exercícios
  async function createWorkoutRoutine() {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('@token');

      if (!token) {
        alert("Você precisa estar logado para criar uma rotina.");
        return;
      }

      // Adiciona o token no cabeçalho da requisição
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Obter o userId e objetivo através da rota /me
      const userResponse = await api.get('/me');
      const userId = userResponse.data.user.id; // Extrair o userId da resposta
      const userObjective: Objective = userResponse.data.user.objective; // Extrair o objetivo do usuário

      if (!userId || !userObjective) {
        alert('Você precisa estar logado e ter um objetivo definido para criar uma rotina.');
        return;
      }

      // Criar o workout (treino)
      const workoutResponse = await api.post(`/workout/${userId}/workouts`, {
        name: 'Segunda',
        objective: userObjective,
      });

      const workoutId = workoutResponse.data.Workout.id_workout; // ID do workout criado
      console.log('Workout ID:', workoutId);

      // Atualizar o nome do treino e o objetivo
      setWorkoutName(workoutResponse.data.Workout.name);
      setObjective(userObjective);

      // Gerar exercícios baseados no objetivo do usuário
      const exerciseData = getExercisesForObjective(userObjective);

      const exercisePromises = exerciseData.map(exercise =>
        api.post('/exercises', exercise)
      );

      

      // Esperar todas as requisições de criação de exercícios terminarem
      const exerciseResponses = await Promise.all(exercisePromises);
      const exerciseIds = exerciseResponses.map(response => response.data.Exercise.id_exercise);
      console.log('Exercise IDs:', exerciseIds);
      

      // Relacionar os exercícios com o workout
      const relationPromises = exerciseIds.map(exerciseId =>
        api.post(`/workoutExercise/${exerciseId}/${workoutId}`, {
          series: 3,         // Número de séries
          repetitions: 12,   // Número de repetições por série
          rest: 60           // Tempo de descanso em segundos
        })
      );

      // Aguardar todas as associações serem feitas
      await Promise.all(relationPromises);

      console.log('Rotina de treino criada com sucesso!');
      alert('Rotina de treino criada com sucesso!');
      setWorkoutCreated(true); // Marca que a rotina foi criada com sucesso

    } catch (error) {
      console.error('Erro ao criar rotina:', error.response || error.message);
      alert('Erro ao criar rotina de treino. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  // Função para selecionar exercícios de acordo com o objetivo
  function getExercisesForObjective(objective: Objective) {
    const exercises = {
      "Perda de Peso": [
        { name: 'Flexão', description: 'Flexão reto', difficulty: 'BEGINNER', requires_equipment: false },
        { name: 'Burpees', description: 'Exercício cardio intenso', difficulty: 'INTERMEDIATE', requires_equipment: false },
        { name: 'Saltos no banco', description: 'Exercício cardio para pernas', difficulty: 'INTERMEDIATE', requires_equipment: true },
        // Adicione mais exercícios para o objetivo de perda de peso
      ],
      "Ganho de Massa Muscular": [
        { name: 'Supino', description: 'Exercício de peito', difficulty: 'INTERMEDIATE', requires_equipment: true },
        { name: 'Agachamento', description: 'Exercício de pernas', difficulty: 'ADVANCED', requires_equipment: true },
        { name: 'Remada', description: 'Exercício para costas', difficulty: 'INTERMEDIATE', requires_equipment: true },
        // Adicione mais exercícios para ganho de massa muscular
      ],
      "hipertrofia": [
        { name: 'Levantamento terra', description: 'Exercício de força total', difficulty: 'ADVANCED', requires_equipment: true },
        { name: 'Puxada frontal', description: 'Exercício para costas', difficulty: 'ADVANCED', requires_equipment: true },
        { name: 'Flexão com pesos', description: 'Flexão de braço com peso adicional', difficulty: 'ADVANCED', requires_equipment: true },
        // Adicione mais exercícios para o objetivo de força
      ],
      // Adicione outros objetivos aqui conforme necessário
    };

    return exercises[objective] || []; // Retorna uma lista vazia caso o objetivo não seja encontrado
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
        mt="$96"
        mb="$3"
        ml="$16"
        variant="outline"
        onPress={createWorkoutRoutine} // Chama a função de criação de rotina
        isDisabled={loading}
      />
    </VStack>
  );
}
