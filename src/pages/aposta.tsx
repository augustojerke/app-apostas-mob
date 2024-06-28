import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/header";
import { View, Text, ScrollView, TouchableOpacity } from "react-native" 
import { useEffect, useState } from "react";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from "../types/types"
import InputText from "../components/input-text";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Aposta(){

    type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Aposta'>;
    const route = useRoute<DetailsScreenRouteProp>();
    const { evento } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [valor, setValor] = useState("");
    const [apostou, setApostou] = useState(false)
    const [ganhou, setGanhou] = useState(false)

    const realizarAposta = async () => {
        const id = await AsyncStorage.getItem("id");
        let idConvertido;
        if(id !== null){
            idConvertido = +id
        }
        try {
            const response = await fetch("http://172.26.176.1:3334/realizarAposta", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_usuario: idConvertido,
                    valor: parseFloat(valor),
                    id_evento: evento
                })
            });

            if (response.ok) {
                setApostou(true)
            }
        } catch (error) {
            console.error('Houve um problema com a operação fetch:', error);
        }
    };

    async function realizarOperacao(processo: number){
        try {
           const response = await fetch("http://172.26.176.1:3334/atualizarSaldo", {
              method: 'PUT',
              headers: {
                 'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                 novoSaldo: parseFloat(valor),
                 operacao: processo
              })                   
           });
        }  catch (error) {
              console.error('Houve um problema com a operação fetch:', error);
        }
  
    }

    useEffect(() => {
        const rand = Math.floor(Math.random() * 2) + 1;

        if(rand == 1){
            setGanhou(true)
            realizarOperacao(1)

        }
        else{
            setGanhou(false)
            realizarOperacao(2)
        }
    }, [apostou])

    return(
        <SafeAreaView className="flex-1 bg-slate-950">
            <Header/>            
            <View className="flex-1 px-6 mt-5 pb-10">
                <Text className="text-white font-bold text-2xl mb-10">Realizar Aposta:</Text>
                <InputText placeholder="Valor" onChangeText={(e) => setValor(e)}/>
                <TouchableOpacity onPress={realizarAposta} className="bg-white w-full flex h-10 justify-center items-center rounded-xl mt-10">
                    <Text className="font-bold text-xl">
                        Apostar
                    </Text>
                </TouchableOpacity> 
                {apostou &&
                    <>
                        <Text className="text-white text-center mt-10 text-2xl">Aposta {ganhou ? "Ganha" : "Perdida"}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("PaginaInicial")} className="bg-white w-full flex h-10 justify-center items-center rounded-xl mt-10">
                            <Text className="font-bold text-xl">
                                Voltar ao Menu
                            </Text>
                        </TouchableOpacity>
                    </>
                }                                              
            </View>            
        </SafeAreaView>
    )
}