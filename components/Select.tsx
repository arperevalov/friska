import CardInterface from "@/interfaces/Card";
import ListInterface from "@/interfaces/List";
import { useEffect, useState } from "react";

export interface InputInterface {
    label: string,
    values: ListInterface[]
    defaultValue?: number ,
    setFormData: CallableFunction,
    formKey: string
}

export const Select = (props: InputInterface) => {
    const { label, defaultValue, values, setFormData, formKey } = props;
    const [inputValue, setInputValue] = useState(defaultValue ? defaultValue : 0);

    useEffect(()=>{
        setFormData((previousValue: CardInterface)=>({...previousValue, [formKey]: inputValue}))
    },[])

    const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const value = parseInt(event.currentTarget.value);
        setInputValue(value);
        setFormData((previousValue: CardInterface)=>({...previousValue, [formKey]: value}))
    }

    return <>
        <label htmlFor="" className="input">
            <span className="input__label">{label}</span>
            <select defaultValue={defaultValue} onChange={onChange} className="input__input">
                {values.map(value => {
                    return <option 
                        key={value.id} 
                        value={value.id} 
                        >
                            {value.title}
                        </option>
                })}
            </select>
        </label>
    </>
}