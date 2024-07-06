import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { SignIn } from '@/screens/SignIn'
import { SignUp } from '@/screens/SignUp'

// A documentação do Navite Stack não permite utilização de interface nesse caso.
type AuthRoutesProps = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorAuthProps = NativeStackNavigationProp<AuthRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>()

export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  )
}
