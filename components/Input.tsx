import CardInterface from "@/interfaces/Card";
import { useState } from "react";

export interface InputInterface {
    label: string,
    defaultValue?: string | null | number ,
    type: string,
    min?: number,
    max?: number,
    setFormData: CallableFunction,
    formKey: string
}

export const Input = (props: InputInterface) => {
    const { label, defaultValue, type, min, max, setFormData, formKey } = props;
    const [inputValue, setInputValue] = useState(defaultValue ? defaultValue : '');

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setInputValue(value);
        setFormData((previousValue: CardInterface)=>({...previousValue, [formKey]: value}))
    }

    return <>
        <label htmlFor="" className="input">
            <span className="input__label">{label}</span>
            <input onChange={onChange} className="input__input" type={ type } value={ inputValue ? inputValue : undefined } min={min} max={max}/>
        </label>
    </>
}