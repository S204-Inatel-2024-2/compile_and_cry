import { Box as GluestackBox, Heading, Text, Pressable } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof GluestackBox> & {
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'tamanho';
  title?: string;
  progress?: number; // Progress value as a percentage (0 to 100)
  onPress?: () => void;
};

export function WorkoutBox({
  children,
  title,
  onPress,
  variant = 'solid',
  progress = 0,
  ...props
}: Props) {
  return (
    <Pressable onPress={onPress}> {/* Adiciona Pressable aqui */}
      <GluestackBox
        w='$96'
        bg={variant === 'solid' ? '$trueGray900' : '$trueGray700'}
        borderWidth={variant === 'outline' ? '$1' : '$0'}
        borderColor={variant === 'outline' ? '$gray800' : 'transparent'}
        rounded="$xl"
        p="$8"
        {...props}
      >
        {title && (
          <Text
            color={variant === 'solid' ? '$white' : '$white'}
            fontFamily="$body"
            fontSize="$3xl"
            mb="$2"
          >
            {title}
          </Text>
        )}

        <Heading mt={10} color="$gray" fontFamily="$body" fontSize="$lg">
          Progresso {progress} %
        </Heading>

        {/* Progress Bar */}
        <GluestackBox w="100%" h="$2" bg="$gray600" rounded="$full" overflow="hidden" mb="$4">
          <GluestackBox
            w={`${progress}%`}
            h="100%"
            bg="$orange"
            rounded="$full"
          />
        </GluestackBox>

        <Text color="$gray" fontFamily="$body" fontSize="$lg">
          {children}
        </Text>
      </GluestackBox>
    </Pressable>
  );
}
