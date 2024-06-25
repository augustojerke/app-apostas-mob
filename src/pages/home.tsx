import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import InputText from "../components/input-text"
import { TouchableOpacity } from "react-native"
import { useState } from "react"

export default function Home(navigation: any){

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    async function logar(){
        await fetch("http://25.72.46.95:3334/loginUsuario",{
            method: 'POST',
            body: JSON.stringify({
                nome: usuario,
                senha: senha,
            }),
            headers: {
                'Content-Type': 'application/json'
            }      
        })
        .then((response) => {
            console.log(response);
        })
    }


    return(
        <SafeAreaView className="flex-1 bg-slate-950 px-10">
            <View className="flex-1 justify-center items-center">
                <Text className="text-white font-bold text-4xl mb-14">Login BeTchê</Text>
                <InputText style={{marginBottom: 20}} texto="Usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
                <InputText texto="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
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