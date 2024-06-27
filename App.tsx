import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home';
import { NativeWindStyleSheet } from "nativewind";
import Cadastro from './src/pages/cadastro';
import PaginaInicial from './src/pages/pagina-inicial';
import { RootStackParamList } from './src/types/types';
import { StatusBar } from 'react-native';
import Saldo from './src/pages/saldo';
import Eventos from './src/pages/eventos';
import Aposta from './src/pages/aposta';

NativeWindStyleSheet.setOutput({
  default: "native",
});

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
        <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{ headerShown: false }}/>
        <Stack.Screen name="Saldo" component={Saldo} options={{ headerShown: false }}/>
        <Stack.Screen name="Eventos" component={Eventos} options={{ headerShown: false }}/>
        <Stack.Screen name="Aposta" component={Aposta} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <StatusBar translucent />
    </NavigationContainer>
  );
}
