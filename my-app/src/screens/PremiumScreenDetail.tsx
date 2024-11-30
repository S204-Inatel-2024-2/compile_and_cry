import React from 'react';
import { Center, Heading, Image, VStack, Spinner } from '@gluestack-ui/themed';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';  // Para navegação
import BackgroundImg from '@assets/Backgroud.png';  // Altere se necessário

export function PremiumScreenDetail() {
  const navigation = useNavigation(); // Hook de navegação

  // Função para voltar à home
  function handleGoHome() {
    navigation.navigate("home");
  }

  return (
    <VStack flex={1}>
      <VStack flex={1}>
        {/* Fundo da página */}
        <Image
          w="$full"
          h="$full"
          source={BackgroundImg}
          alt="Fundo Premium"
          position="absolute"
        />

        {/* Conteúdo da página */}
        <VStack flex={1} px="$10" pb="$16" justifyContent="center" alignItems="center">
          <Center gap="$4">
            <Heading color="$white" fontSize={40} textAlign="center">
              Em Breve
            </Heading>

            {/* Spinner (Carregando) */}
            <Spinner color="$white" />

            <Heading color="$white" fontSize={16} textAlign="center" mt={4}>
              Estamos preparando algo incrível para você. Fique ligado!
            </Heading>
            
            {/* Botão para voltar à Home */}
            <Button
              title="Voltar para a Home"
              mt="$12"
              onPress={handleGoHome}
            />
          </Center>
        </VStack>
      </VStack>
    </VStack>
  );
}
