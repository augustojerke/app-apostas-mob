import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/header";
import { View, Text, ScrollView, TouchableOpacity } from "react-native" 
import { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from "../types/types"

export default function Aposta(){
    return(
        <SafeAreaView className="flex-1 bg-slate-950">
            <Header/>            
            <View className="flex-1 px-6 mt-5 pb-10">
                                                       
            </View>            
        </SafeAreaView>
    )
}