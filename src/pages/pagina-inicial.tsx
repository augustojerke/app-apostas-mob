import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../components/input-text";
import Header from "../components/header";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState, useCallback } from "react";
import { useNavigation, NavigationProp, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from "../types/types"

export default function PaginaInicial(){

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [usuario, setUsuario] = useState(null)
    const [saldo, setSaldo] = useState("")
    
    const listarUsuario = async () => {
        try {
            const response = await fetch("https://app-apostas-backend.onrender.com/listarUsuario", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsuario(data.data.nome);
                setSaldo(data.data.saldo);
            }
        } catch (error) {
            console.error('Houve um problema com a operação fetch:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            listarUsuario();    
        }, [])
    );
    
    return(
        <SafeAreaView className="flex-1 bg-slate-950">
            <Header/>            
            <View className="flex-1 justify-center items-center px-6">
                <MaterialIcons name="account-circle" size={250} color="white" />
                <View className="bg-slate-800 h-28 flex flex-row rounded-2xl w-full mt-10">
                    <View className="flex-1 justify-center items-center gap-3">
                        <Text className="text-white font-bold text-xl">
                            Usuário: {usuario}
                        </Text>
                        <Text className="text-white font-bold text-xl">
                            Saldo: {parseFloat(saldo).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </Text>
                    </View>
                    <View className="flex-1 justify-center items-center gap-2">
                        <TouchableOpacity onPress={() => navigation.navigate("Saldo", { processo: 1 })} className="bg-blue-400 flex h-8 w-24 justify-center items-center rounded mt-10">
                            <Text className="font-bold text-sm">
                                Depositar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Saldo", { processo: 2 })} className="bg-green-500 flex h-8 w-24 justify-center items-center rounded mt-10">
                            <Text className="font-bold text-sm">
                                Sacar
                            </Text>
                        </TouchableOpacity>
                    </View>                    
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Eventos")} className="bg-white w-full flex h-10 justify-center items-center rounded-xl mt-10">
                    <Text className="font-bold text-xl">
                        Realizar Aposta
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ConsultaApostas")} className="bg-white w-full flex h-10 justify-center items-center rounded-xl mt-10 mb-10">
                    <Text className="font-bold text-xl">
                        Consultar Apostas
                    </Text>
                </TouchableOpacity>                   
            </View>
        </SafeAreaView>
    )
}