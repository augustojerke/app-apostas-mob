import { Text, View, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import InputText from "../components/input-text"
import { TouchableOpacity } from "react-native"
import { useState } from "react"
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "../types/types"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(){

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    async function logar() {
        try {
            const response = await fetch("https://app-apostas-backend.onrender.com/loginUsuario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: usuario,
                    senha: senha
                })
            });
            
    
            if (response.ok) {
                const data = await response.json();
                if(data.token){
                    await AsyncStorage.setItem("id", data.id.toString());
                    navigation.navigate("PaginaInicial");
                }
                else{
                    Alert.alert("Login Inválido")
                }
            }
        } catch (error) {
            console.error('Houve um problema com a operação fetch:', error);
        }
    }


    return(
        <SafeAreaView className="flex-1 bg-slate-950 px-10">
            <View className="flex-1 justify-center items-center">
                <Text className="text-white font-bold text-4xl mb-14">Login BeTchê</Text>
                <InputText style={{marginBottom: 20}} placeholder="Usuário" value={usuario} onChangeText={(e) => setUsuario(e)}/>
                <InputText secureTextEntry placeholder="Senha" value={senha} onChangeText={(e) => setSenha(e)}/>
                <TouchableOpacity onPress={logar} className="bg-white w-full flex h-10 justify-center items-center rounded-xl mt-10">
                    <Text className="font-bold text-xl">
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                    <Text className="text-white font-bold text-xl mt-10">Cadastre-se aqui</Text>
                </TouchableOpacity>                
            </View>
        </SafeAreaView>
    )
}