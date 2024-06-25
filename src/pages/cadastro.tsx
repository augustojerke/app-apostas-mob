import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputText from "../components/input-text";

export default function Cadastro(){
    return(
        <SafeAreaView className="flex-1 bg-slate-950 px-10">
            <View className="flex-1 justify-center items-center">
                <Text className="text-white font-bold text-4xl mb-14">Cadastro BeTchê</Text>
                <InputText style={{marginBottom: 20}} texto="Usuário"/>
                <InputText texto="Senha"/>
                <TouchableOpacity className="bg-white w-full flex h-10 justify-center items-center rounded-xl mt-10">
                    <Text className="font-bold text-xl">
                        Cadastrar
                    </Text>
                </TouchableOpacity>               
            </View>
        </SafeAreaView>
    )
}