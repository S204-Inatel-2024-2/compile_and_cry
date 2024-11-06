import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import LoginScreen from '/Button';  // O componente que está sendo testado
import fetchMock from 'jest-fetch-mock';

// Se necessário, mockar localStorage
jest.mock('react-native', () => ({
  AsyncStorage: jest.fn(),
}));

test('shows error message on invalid email', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.press(getByText('Login'));
    expect(getByText('Please enter a valid email')).toBeTruthy();
  });
  