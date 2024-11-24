import { Center, Divider, Heading, Image, Text, VStack } from '@gluestack-ui/themed';
import BackgroundImg from '@assets/Backgroud.png';
import Logo from '@assets/Logo.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from '@react-navigation/native';
import { Box } from '@components/Box';
import { HomeHeader } from '@components/HomeHeader';

export function Config() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleProfile() {
    navigation.navigate("profile");
  }

  return (
    <VStack flex={1}>
      <VStack flex={1} px="$1" pb="$16">
        <HomeHeader 
        title='Configuração da conta'
        showBackButton={true}
         />
        <Divider mt={20}></Divider>
        <Center gap="$6" mt={130}>

          <Input 
            placeholder="Nome"
            autoCapitalize="none"
          />
          <Input placeholder="email"/>
          <Input placeholder="Senha" secureTextEntry />
          <Input placeholder="Confirmar senha" secureTextEntry />
          <Button title="Confirmação de Alteração" onPress={handleProfile} />
        </Center>
      </VStack>
    </VStack>
  );
}
