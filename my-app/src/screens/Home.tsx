import React, { useState } from 'react';
import { Button } from '@components/Button';
import { HomeHeader } from '@components/HomeHeader';
import { WorkoutBox } from '@components/WorkoutBox';
import { Center, Divider, Heading, VStack, Text } from '@gluestack-ui/themed'; // Importando o Text corretamente
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';  // Importando a instância do Axios para fazer a requisição

export function Home() {
  const [loading, setLoading] = useState(false); // Para gerenciar o estado de carregamento
  const navigation = useNavigation();

  const handleToWorkout = () => {
    navigation.navigate("workouts");
  };

  // async function createWorkoutRoutine() {
  //   setLoading(true);
  
  //   try {
  //     const workoutId = "0050ff50-0338-49ff-96df-fa383df503da";
  //     const exerciseId = "1806bad6-d909-4431-bb26-3227faf3d058";
  //     const requestData = {
  //       series: 3,
  //       repetitions: 12,
  //       rest: 60,
  //     };
  
  //     // Verifique se você tem o token armazenado (exemplo usando localStorage ou AsyncStorage)
  //     const token = await getToken(); // Ajuste conforme necessário, por exemplo, localStorage ou AsyncStorage
  
  //     if (!token) {
  //       alert("Você precisa estar logado para criar uma rotina.");
  //       return;
  //     }
  
  //     // Enviando o token de autenticação no cabeçalho
  //     const response = await api.post(`/workoutExercise/${workoutId}/${exerciseId}`, requestData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho da requisição
  //       },
  //     });
  
  //     console.log("Rotina criada com sucesso:", response.data);
  //     alert("Rotina de treino criada com sucesso!");
  //   } catch (error) {
  //     console.error("Erro ao criar rotina:", error.response || error.message);
  //     alert("Erro ao criar rotina de treino. Tente novamente.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  

  return (
    <VStack flex={1}>
      <HomeHeader 
        title="Treinos"
        userPhotoUri='https://github.com/luanrobert07.png'
      />
      <Divider bg="$gray400" />
      <Heading color="$white" fontSize="$3xl" alignItems="center" ml="$12" mt="$12"> Meu Plano </Heading>
      <WorkoutBox onPress={handleToWorkout} title="Treino Personalizado" variant="solid" mb={10} mt={20} ml={20} progress={75}>
        <Text>Perder Peso e Abdômen</Text> 
      </WorkoutBox>
      
      <Button
        title={loading ? "Criando..." : "Criar uma nova rotina de treino"}
        mt="$96"
        mb="$3"
        ml="$16"
        variant='outline'
        // onPress={createWorkoutRoutine} // Chamando a função para criar a rotina
        isDisabled={loading}
      />
    </VStack>
  );
}
