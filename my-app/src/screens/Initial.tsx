import {
    Heading,
    Image,
    VStack,
  } from '@gluestack-ui/themed';
  
  import BackgroundImg from '@assets/Backgroud.png';
  import { Button } from '@components/Button';
  
  import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
  import { useNavigation } from '@react-navigation/native';
  
  export function Initial() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
  
    function handleNewAccont(){
        navigation.navigate("signup")
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
            opacity={0.5}
          />
  
          <VStack flex={1} px="$10" pb="$16">
    
            <Heading color="$orange500" fontSize={33} marginTop={300}>Vamos começar?</Heading>
            <Heading color="$white" marginTop={20}>Primeiro, preciso saber algumas informações sobre você. Essas informações serão utilizadas para criar uma experieência personalisada para seu objetivo.</Heading>
  
            <Button
              title="Próximo"
              mt="$56"
              mb="$3"
              ml="$16"
              onPress={handleNewAccont} />
          </VStack>
        </VStack>
      </VStack>
    );
  }
  