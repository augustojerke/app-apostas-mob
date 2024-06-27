import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/header";
import { View, Text, ScrollView, TouchableOpacity } from "react-native" 
import { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "../types/types"

export default function Eventos(){

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        listarEventos();
    }, [])

    async function listarEventos(){

        try {
           const response = await fetch("http://172.30.48.1:3334/eventos", {
              method: 'GET',
              headers: {
                 'Content-Type': 'application/json'
              },                                
           });
            
           if (response.ok) {
              const data = await response.json();
              setEventos(data)
           }
        }  catch (error) {
              console.error('Houve um problema com a operação fetch:', error);
        }
    }

    function escolherEvento(evento: number){

        navigation.navigate("Aposta", {evento: evento})

    }

    return(
        <SafeAreaView className="flex-1 bg-slate-950">
            <Header/>            
            <View className="flex-1 px-6 mt-5 pb-10">
                <Text className="text-white font-bold text-2xl mb-10">Escolha um Evento:</Text>
                <ScrollView className="gap-10">
                    { eventos.map((item: any) => (
                        <TouchableOpacity onPress={() => escolherEvento(item.id_evento)} key={item.id_evento} className="bg-slate-500 h-12 flex justify-center items-center ">
                            <Text className="text-white text-center text-xl">{item.nome}</Text>
                        </TouchableOpacity>
                    )) }
                </ScrollView>                                         
            </View>            
        </SafeAreaView>  
    )
}