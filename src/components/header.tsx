import { Text, View, StatusBar } from "react-native"

export default function Header(){
   return(
      <View className="bg-black flex-none h-16 items-center justify-center">
         <Text className="text-white font-bold text-center text-3xl">
            BeTchê
         </Text>         
      </View>
   )
}