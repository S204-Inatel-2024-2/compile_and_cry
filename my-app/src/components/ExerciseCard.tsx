import { Box as GluestackBox, Pressable, Text, Image, HStack } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof GluestackBox> & {
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'tamanho';
  title?: string;
  onPress?: () => void;
  imageUrl?: string; // URL da imagem opcional
};

export function ExerciseCard({ children, title, onPress, imageUrl, variant = 'solid', ...props }: Props) {
  return (
    <Pressable onPress={onPress}>
      <GluestackBox 
        w='$96'
        bg={variant === 'solid' ? '$trueGray700' : '$trueGray700'}
        borderWidth={variant === 'outline' ? '$1' : '$0'}
        borderColor={variant === 'outline' ? '$gray400' : 'transparent'}
        rounded="$md"
        p="$4"
        
        {...props}
      >
        <HStack alignItems="center" mr={30} > {/* Organização horizontal da imagem e texto */}
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              alt="Imagem do box"
              w="$16"
              h="$16"
              rounded="$sm"
            />
          )}
          
          <GluestackBox flex={1} pl={30}> {/* Contêiner para o título e texto */}
            {title && (
              <Text
                color={variant === 'solid' ? '$white' : '$white'}
                fontFamily="$body"
                fontSize="$xl"
                mb="$1"
              >
                {title}
              </Text>
            )}

            <Text
              color='$gray'
              fontFamily="$body"
              fontSize="$lg"
            >
              {children}
            </Text>
          </GluestackBox>
        </HStack>
      </GluestackBox>
    </Pressable>
  );
}
