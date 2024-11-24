import { ExerciseCard } from '@components/ExerciseCard'
import { HomeHeader } from '@components/HomeHeader'
import { Center, Divider, Text } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

export function Workouts() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleToExercise() {
    navigation.navigate("exercise");
  }

  return (
    <>
         
    <HomeHeader showBackButton={true} title='Treino Personalizado'  ></HomeHeader>
    <Center flex={1}>
      <Center>
      <Text pr={260} pb={20} color="white" >Exercícios</Text>
      <Divider bg="$gray400" mb={20}/>
        <ExerciseCard
         onPress= {handleToExercise} 
         title="Supino inclinado" 
         variant="solid" mb={20} 
         children="Treine" 
         imageUrl='https://v4excellencefitness.com.br/wp-content/uploads/2023/05/Bicep-Alternado-Martelo1.png'
        />

        <ExerciseCard
          title="Supino inclinado" variant="solid" mb={20} children="Treine" imageUrl='https://v4excellencefitness.com.br/wp-content/uploads/2023/05/Bicep-Alternado-Martelo1.png'
        />
        <ExerciseCard
          title="Supino inclinado" variant="solid" mb={20} children="Treine" imageUrl='https://v4excellencefitness.com.br/wp-content/uploads/2023/05/Bicep-Alternado-Martelo1.png'
        />
        <ExerciseCard
          title="Supino inclinado" variant="solid" mb={20} children="Treine" imageUrl='https://v4excellencefitness.com.br/wp-content/uploads/2023/05/Bicep-Alternado-Martelo1.png'
        />
      </Center>
      <ExerciseCard
        title="Supino inclinado" variant="solid" mb={10} children="Treine" imageUrl='https://v4excellencefitness.com.br/wp-content/uploads/2023/05/Bicep-Alternado-Martelo1.png'
      />
    </Center>
    </>
  )
}