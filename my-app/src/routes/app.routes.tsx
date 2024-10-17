import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { Exercise } from '@screens/Exercise';
import { Workouts } from '@screens/Workouts';
import { Profile } from '@screens/Profile';
import { gluestackUIConfig } from '@gluestack-ui/config';


import HomeSvg from "@assets/Logo.png"
import { Platform } from 'react-native';
import { MyProfiletwo } from '@screens/MyProfileTwo';
import { MyProfileThree } from '@screens/MyProfileThree';
import { PersonalityTrainer } from '@screens/PersonalityTrainer';
import { MyProfileFour } from '@screens/MyProfileFour';

type AppRoutes = {
    home: undefined;
    exercise: undefined;
    profile: undefined;
    workouts: undefined;
    profileDefinition: undefined;
    myprofiletwo: undefined;
    myprofilethree: undefined;
    personalityTrainer: undefined;
    myprofilefour: undefined
  }
  
  export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;
  
  const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()
export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space["6"]

  return (
    <Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.orange500,
        tabBarInactiveTintColor: tokens.colors.black,
        tabBarStyle:{
            backgroundColor: tokens.colors.coolGray600,
            borderTopWidth: 0,
            height: Platform.OS === "android" ? "auto" : 96,
            paddingBottom: tokens.space["10"],
            paddingTop: tokens.space["6"],
        },
    }}>
      
      <Screen 
        name='home'
        component={Home}
        options={{
          tabBarButton: () => null
      }}
      />

      <Screen 
        name='workouts'
        component={Workouts}
        options={{
          tabBarButton: () => null
      }}
      />

      <Screen 
        name='profile'
        component={Profile}
        options={{
          tabBarButton: () => null
      }}
      />

      <Screen 
        name='exercise'
        component={Exercise}
        options={{
            tabBarButton: () => null
        }}
      />
      <Screen 
        name='myprofiletwo'
        component={MyProfiletwo}
        options={{
            tabBarButton: () => null
        }}
      />
      <Screen 
        name='myprofilethree'
        component={MyProfileThree}
        options={{
            tabBarButton: () => null
        }}
      />

      <Screen 
        name='myprofilefour'
        component={MyProfileFour}
        options={{
            tabBarButton: () => null
        }}
      />

      <Screen 
        name='personalityTrainer'
        component={PersonalityTrainer}
        options={{
            tabBarButton: () => null
        }}
      />
    </Navigator>
  );
}