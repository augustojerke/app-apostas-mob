import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../components/input-text";
import { useState } from "react";

export default function Cadastro(){

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    async function cadastrar() {
        try {
            const response = await fetch("http://172.30.48.1:3334/usuario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: usuario,
                    senha: senha
                })
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                Alert.alert("Usuário Cadastrado!")
            })
        } catch (error) {
            console.error('Houve um problema com a operação fetch:', error);
        }
    }


    return(
        <SafeAreaView className="flex-1 bg-slate-950 px-10">
            <View className="flex-1 justify-center items-center">
                <Text className="text-white font-bold text-4xl mb-14">Cadastro BeTchê</Text>
                <InputText onChangeText={(e) => setUsuario(e)} value={usuario} style={{marginBottom: 20}} placeholder="Usuário"/>
                <InputText onChangeText={(e) => setSenha(e)} value={senha} placeholder="Senha" secureTextEntry/>
                <TouchableOpacity onPress={cadastrar} className="bg-white w-full flex h-10 justify-center items-center rounded-xl mt-10">
                    <Text className="font-bold text-xl">
                        Cadastrar
                    </Text>
                </TouchableOpacity>               
            </View>
        </SafeAreaView>
    )
}