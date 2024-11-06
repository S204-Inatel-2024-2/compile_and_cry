import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginButton from '/test/components/LoginButton';

test('Renderiza botão de login e verifica clique', () => {
  const onPress = jest.fn();
  const { getByText } = render(<LoginButton onPress={onPress} />);
  const button = getByText('Login');
  fireEvent.press(button);
  expect(onPress).toHaveBeenCalled();
});
