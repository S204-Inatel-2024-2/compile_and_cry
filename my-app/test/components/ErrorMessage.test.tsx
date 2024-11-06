import React from 'react';
import { render } from '@testing-library/react-native';
import ErrorMessage from 'test/components/ErrorMessage';

est('Mostra mensagem de erro', () => {
    const { getByText } = render(<ErrorMessage message="Erro de autenticação" />);
    expect(getByText('Erro de autenticação')).toBeTruthy();
  });
  