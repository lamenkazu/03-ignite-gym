import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { SignIn } from "@/screens/SignIn";
import { SignUp } from "@/screens/SignUp";

// A documentação do Navite Stack não permite utilização de interface nesse caso.
type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorAuthProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export const AuthRoutes = () => {
  return (
    <Navigator>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
};
