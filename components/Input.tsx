import { useState } from "react";

export interface InputInterface {
    label: string,
    defaultValue?: string | null | number ,
    type: string,
    min?: number,
    max?: number
}

export const Input = (props: InputInterface) => {
    const { label, defaultValue, type, min, max } = props;
    const [inputValue, setInputValue] = useState(defaultValue);

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setInputValue(value);
    }

    return <>
        <label htmlFor="" className="input">
            <span className="input__label h3">{label}</span>
            <input onChange={onChange} className="input__input" type={ type } value={ inputValue ? inputValue : undefined } min={min} max={max}/>
        </label>
    </>
}