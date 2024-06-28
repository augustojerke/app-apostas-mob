import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/header";
import { View, Text, ScrollView, TouchableOpacity } from "react-native" 
import { useEffect, useState } from "react";

export default function ConsultaApostas(){

    const [apostas, setApostas] = useState([]);

    useEffect(() => {
        listarApostas();
    }, [])

    async function listarApostas(){

        try {
           const response = await fetch("http://172.26.176.1:3334/apostasUsuario", {
              method: 'GET',
              headers: {
                 'Content-Type': 'application/json'
              },                                
           });
            
           if (response.ok) {
              const data = await response.json();
              setApostas(data.data)
           }
        }  catch (error) {
              console.error('Houve um problema com a operação fetch:', error);
        }
    }

    return(
        <SafeAreaView className="flex-1 bg-slate-950">
            <Header/>            
            <View className="flex-1 px-6 mt-5 pb-10">
                <Text className="text-white font-bold text-2xl mb-10">Apostas do Usuário:</Text>
                <ScrollView className="gap-10">
                    { apostas.map((item: any) => (
                        <TouchableOpacity key={item.id_aposta} className="bg-slate-500 h-12 flex justify-center items-center ">
                            <Text className="text-white text-center text-xl">{item.evento.nome} - {parseFloat(item.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
                        </TouchableOpacity>
                    )) }
                </ScrollView>                                         
            </View>            
        </SafeAreaView>  
    )
}