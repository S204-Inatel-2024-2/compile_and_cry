import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../src/screens/LoginScreen';
import authService from '../../src/services/authService';

jest.mock('../../src/services/authService');

test('Navega para a tela principal após login bem-sucedido', async () => {
  (authService.login as jest.Mock).mockResolvedValue({ token: '12345' });

  const { getByPlaceholderText, getByText } = render(<LoginScreen />);
  fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
  fireEvent.changeText(getByPlaceholderText('Senha'), 'password123');
  fireEvent.press(getByText('Login'));

  await waitFor(() => {
    expect(authService.login).toHaveBeenCalledWith('user@example.com', 'password123');
  });
});
