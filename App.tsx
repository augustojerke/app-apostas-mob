import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home';
import { NativeWindStyleSheet } from "nativewind";
import Cadastro from './src/pages/cadastro';
import PaginaInicial from './src/pages/pagina-inicial';

NativeWindStyleSheet.setOutput({
  default: "native",
});

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
        <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
