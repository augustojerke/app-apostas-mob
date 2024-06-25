import { ComponentProps } from "react";
import { TextInput } from "react-native";

interface InputTextProps extends ComponentProps<'input'>{
    texto: string
}

export default function InputText(p: InputTextProps){
    return(
        <TextInput
            {...p} 
            placeholder={p.texto}
            className="text-white bg-slate-500 rounded-xl w-full px-4 h-12 text-xl"
        />
    )
}