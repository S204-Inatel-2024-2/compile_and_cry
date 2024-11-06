import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
// import LoginScreen from '../LoginScreen';  // O componente que está sendo testado
import fetchMock from 'jest-fetch-mock';

// Se necessário, mockar localStorage
jest.mock('react-native', () => ({
  AsyncStorage: jest.fn(),
}));

test('sends login request and receives auth token', async () => {
    const mockLoginResponse = { token: 'abc123' };
    fetchMock.postOnce('/login', mockLoginResponse);
  
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));
  
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/login', expect.any(Object)));
    expect(localStorage.getItem('authToken')).toBe('abc123');
  });
  