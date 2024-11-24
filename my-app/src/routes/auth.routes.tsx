import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Config } from '@screens/ConfigConta';
import { Exercise } from '@screens/Exercise';
import { Home } from '@screens/Home';
import { Initial } from '@screens/Initial';
import { Login } from '@screens/Login';
import { MyProfileFive } from '@screens/MyProfileFive';
import { MyProfileFour } from '@screens/MyProfileFour';
import { MyProfileSix } from '@screens/MyProfileSix';
import { MyProfileThree } from '@screens/MyProfileThree';
import { MyProfiletwo } from '@screens/MyProfileTwo';
import { PersonalityTrainer } from '@screens/PersonalityTrainer';
import { PlanosScreen } from '@screens/PlanosScreen';
import { PremiunScreen } from '@screens/PremiunScreen';
import { Profile } from '@screens/Profile';
import { Register } from '@screens/Register';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { Workouts } from '@screens/Workouts';

type AuthRoutes = {
    signIn: undefined;
    initial: undefined;
    signup: undefined;
    myprofiletwo: undefined;
    personalityTrainer: undefined
    myprofilethree: undefined
    myprofilefour: undefined
    myprofilefive: undefined
    myprofilesix: undefined
    login: undefined
    home: undefined
    register: undefined
    planosscreen: undefined
    premiunscreen: undefined
    profile: undefined
    workouts: undefined
    exercise: undefined
    config: undefined
  }
  
  export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;
  
  const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();
  export function AuthRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
      contentStyle: { flex: 1 },
    }}>
      <Screen 
        name="signIn"
        component={SignIn}
      />

      <Screen 
        name="signup"
        component={SignUp}
      />

      <Screen 
        name="initial"
        component={Initial}
      />
      <Screen 
        name="personalityTrainer"
        component={PersonalityTrainer}
      />
      <Screen 
        name="myprofiletwo"
        component={MyProfiletwo}
      />
      <Screen 
        name="myprofilethree"
        component={MyProfileThree}
      />
      <Screen 
        name="myprofilefour"
        component={MyProfileFour}
      />
      <Screen 
        name="myprofilefive"
        component={MyProfileFive}
      />
      <Screen 
        name="myprofilesix"
        component={MyProfileSix}
      />
      <Screen 
        name="login"
        component={Login}
      />
      <Screen 
        name="home"
        component={Home}
      />
      <Screen 
        name="register"
        component={Register}
      />
      <Screen 
        name="planosscreen"
        component={PlanosScreen}
      />
      <Screen 
        name="premiunscreen"
        component={PremiunScreen}
      />
      <Screen
        name="profile"
        component={Profile}
      />
      <Screen
        name="workouts"
        component={Workouts}
      />
      <Screen 
        name="exercise"
        component={Exercise}
      />
      <Screen
        name='config'
        component={Config}
      />

    </Navigator>
  )
}