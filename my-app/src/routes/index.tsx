import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { Box } from '@gluestack-ui/themed'
export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.coolGray700
  return (
    <Box flex={1} bg="$gray700">
        <AuthRoutes />
    </Box>
  )
}