import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/header";
import { View, Text, Alert } from "react-native" 
import InputText from "../components/input-text"
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "../types/types"
import { TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";

export default function Saldo(){

   type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Saldo'>;
   const route = useRoute<DetailsScreenRouteProp>();
   const { processo } = route.params;
   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

   const [novoSaldo, setNovoSaldo] = useState("")

   async function realizarOperacao(){

      try {
         const response = await fetch("http://25.1.200.143:3334/atualizarSaldo", {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               novoSaldo: parseFloat(novoSaldo),
               operacao: processo
            })                   
         });
          
         if (response.ok) {
            const data = await response.json();
         }
      }  catch (error) {
            console.error('Houve um problema com a operação fetch:', error);
      }

      Alert.alert("Saldo Atualizado!")

      navigation.navigate("PaginaInicial")

  }

   return(
      <SafeAreaView className="flex-1 bg-slate-950">
         <Header/>            
         <View className="flex-1 justify-center items-center px-6">
            <InputText placeholder="Digite o Valor" onChangeText={(e) => setNovoSaldo(e)}/>
            <TouchableOpacity onPress={realizarOperacao} className="bg-green-600 w-full flex h-10 justify-center items-center rounded-xl mt-10">
               <Text className="font-bold text-xl">
                  Confirmar Transação
               </Text>
            </TouchableOpacity>                                           
         </View>
      </SafeAreaView>
   )
}