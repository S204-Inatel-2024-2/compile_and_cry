import React, { useState, useEffect } from 'react';
import { Center, Heading, Image, VStack } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImg from '@assets/Backgroud.png';
import Logo from '@assets/Logo.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [objective, setObjective] = useState(''); // Para carregar do AsyncStorage
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Função para carregar dados do AsyncStorage
  const loadUserMetrics = async () => {
    try {
      const storedFormData = await AsyncStorage.getItem('@formData');
      const storedObjective = await AsyncStorage.getItem('@objective');

      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData);
        setHeight(parsedData.height);
        setWeight(parsedData.weight);
        setDateOfBirth(parsedData.birthDate);
      }

      if (storedObjective) {
        setObjective(storedObjective);
      }

      // Log dos dados carregados
      console.log('Dados carregados do AsyncStorage:', {
        height,
        weight,
        dateOfBirth,
        objective: storedObjective,
      });
    } catch (error) {
      console.error('Erro ao carregar dados do AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadUserMetrics();
  }, []);

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      return alert('Preencha todos os campos!');
    }

    if (password !== confirmPassword) {
      return alert('As senhas não coincidem!');
    }

    setLoading(true);

    try {
      // Envia os dados para a API de registro
      const response = await api.post('/users', {
        name,
        email,
        password,
        height,
        weight,
        date_of_birth: dateOfBirth,
        objective, // Valor dinâmico do objetivo
      });
      console.log('Resposta da API:', response.data);
      alert('Cadastro realizado com sucesso!');

      // Limpar os campos após o cadastro bem-sucedido
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Navegar para a tela de login após o cadastro
      navigation.navigate('login');
    } catch (error) {
      console.error(error);
      alert('Não foi possível realizar o cadastro. Verifique os dados.');
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
        alt="Imagem de fundo"
        position="absolute"
      />
      <VStack flex={1} px="$1" pb="$16">
        <Center my="$24">
          <Image w="$2/3" h="$64" source={Logo} alt="Logo" />
        </Center>
        <Center gap="$6">
          <Heading color="$orange500">Crie sua conta agora!</Heading>
          <Input placeholder="Nome" value={name} onChangeText={setName} />
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
          <Input
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Button
            variant="outline"
            title={loading ? 'Carregando...' : 'Cadastrar'}
            onPress={handleRegister}
            isDisabled={loading}
          />
        </Center>
      </VStack>
    </VStack>
  );
}
