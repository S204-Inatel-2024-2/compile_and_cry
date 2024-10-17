import { Box as GluestackBox, Text } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof GluestackBox> & {
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'tamanho';
  title?: string;
};

export function Box({ children,title, variant = 'solid', ...props }: Props) {
  return (
    <GluestackBox
      w={variant === "solid" ? '$full' : '$56'}
      bg={variant === 'solid' ? '$trueGray700' : '$trueGray700'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor={variant === 'outline' ? '$gray400' : 'transparent'}
      rounded="$md"
      p="$4"
      {...props}
    >
      {title && ( // Renderiza o título se ele estiver presente
        <Text
          color={variant === 'solid' ? '$white' : '$white'}
          fontFamily="$body"
          fontSize="$xl" // Tamanho do texto do título
          mb="$2" // Margem inferior para espaçamento
        >
          {title}
        </Text>
      )}

      <Text
        color={variant === 'solid' ? '$white' : '$gray'}
        fontFamily="$body"
        fontSize="$lg"
      >
        {children}
      </Text>
    </GluestackBox>
  );
}
