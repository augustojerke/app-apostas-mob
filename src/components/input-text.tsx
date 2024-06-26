import { ComponentProps } from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputTextProps extends TextInputProps{
    
}

export default function InputText(p: InputTextProps){
    return(
        <TextInput
            {...p} 
            className="text-white bg-slate-500 rounded-xl w-full px-4 h-12 text-xl"
        />
    )
}