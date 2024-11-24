import { HStack, Icon, Text, VStack, Pressable } from '@gluestack-ui/themed';
import { UserPhoto } from './UserPhoto';
import { LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { ArrowLeft } from 'lucide-react-native'; // Importar o ícone de retorno

type Props = {
  title?: string; // Título do header, opcional
  userPhotoUri?: string; // URI da imagem do usuário, opcional
  icon?: React.ReactNode; // Ícone opcional, pode ser qualquer componente de ícone
  showBackButton?: boolean; // Opção para mostrar o botão de retorno
};

export function HomeHeader({
  title = "",
  userPhotoUri = '',
  icon = null,
  showBackButton = false
}: Props) {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  
  function handleProfile() {
    navigation.navigate("profile");
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack bg="$gray600" pt="$8" px="$8" alignItems="center" gap="$4">
      
      {showBackButton && (
        <Pressable onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$white" size="lg" />
        </Pressable>
      )}

      <VStack flex={1}>
        <Text color="$white" fontSize="$2xl" alignItems="center">
          {title}
        </Text>
      </VStack>

      <Pressable onPress={handleProfile}>
        <UserPhoto source={{ uri: userPhotoUri }} w="$16" h="$16" alt="Imagem do usuário" />
      </Pressable>
      
      {icon}
    </HStack>
  );
}
