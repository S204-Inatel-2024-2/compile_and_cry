import { Box } from '@components/Box'
import { HomeHeader } from '@components/HomeHeader'
import { Center, Divider, Text, VStack } from '@gluestack-ui/themed'
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from '@react-navigation/native';

export function Profile() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleToConfig() {
    navigation.navigate("config");
  }
  function handleToOut(){
    navigation.navigate("login");
  }

  function handleToPremiun(){
    navigation.navigate("premiunscreen")
  }
  
  return (
    <VStack flex={1}>
      <HomeHeader 
        title="Conta"
        userPhotoUri='https://github.com/luanrobert07.png'
        showBackButton={true}
      />
      <Divider bg="$gray400" mb={200} mt={20}/>

      <Center>
          <Box onPress={handleToConfig} title="Configuração da conta" variant="outline" mb={40}>
          </Box>
          <Box onPress={handleToPremiun} title="Versão Premiun" variant="outline"  mb={40}>
          </Box>
          <Box onPress={handleToOut} title="Sair da conta" variant="outline" mb={40}>
          </Box>
      </Center>
    </VStack>
  )
}