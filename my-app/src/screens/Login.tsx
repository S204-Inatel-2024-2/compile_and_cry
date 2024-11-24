import React, { useState } from 'react';
import { Center, Heading, Image, VStack } from '@gluestack-ui/themed';
import BackgroundImg from '@assets/Backgroud.png';
import Logo from '@assets/Logo.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleLogin() {
    if (!email || !password) {
      return alert('Preencha todos os campos!');
    }
  
    setLoading(true);
  
    try {
      const response = await api.post('/sessions', { email, password });
      console.log('Resposta da API:', response.data);
      alert('Login realizado com sucesso!');
      
      // Limpar os campos de entrada após login bem-sucedido
      setEmail('');
      setPassword('');
      
      navigation.navigate('home');
    } catch (error) {
      console.error(error);
      alert('Não foi possível realizar o login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <VStack flex={1}>
      <Image
        w="$full"
        h="$full"
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Treino em uma academia"
        position="absolute"
      />
      <VStack flex={1} px="$1" pb="$16">
        <Center my="$24">
          <Image w="$2/3" h="$64" source={Logo} alt="Logo" />
        </Center>
        <Center gap="$6">
          <Heading color="$orange500" paddingBottom={20}>
            Seu treino na palma da mão!
          </Heading>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button
            variant="outline"
            title={loading ? 'Carregando...' : 'Entrar'}
            onPress={handleLogin}
            isDisabled={loading}
          />
        </Center>
      </VStack>
    </VStack>
  );
}
