import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo o tipo do token decodificado (assumindo que 'sub' seja o userId)
interface DecodedToken {
  sub: string;
  [key: string]: any; // Permite outros campos do token, se necessário
}

// Função para pegar o userId do token
export async function getUserId(): Promise<string | null> {
  try {
    // Recuperar o token armazenado
    const token = await AsyncStorage.getItem('@token');
    if (!token) {
      console.error('Token não encontrado.');
      return null; // Retorna null se o token não estiver disponível
    }

    // Decodificar o token JWT
    const decodedToken: DecodedToken = jwt_decode(token);

    // Verificar se o 'sub' (userId) existe no token
    if (!decodedToken.sub) {
      console.error('userId não encontrado no token.');
      return null;
    }

    // Retornar o userId (assumindo que o 'sub' seja o userId no token)
    return decodedToken.sub;
  } catch (error) {
    console.error('Erro ao obter userId:', error instanceof Error ? error.message : error);
    return null;
  }
}
