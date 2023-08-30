import CardInterface from "@/interfaces/Card";
import { useState } from "react";

export interface InputInterface {
    label: string;
    defaultValue?: string | null;
    setFormData: CallableFunction;
    formKey: string;
    required?: boolean;
}

export const InputCalendar = (props: InputInterface) => {
    const { label, defaultValue, setFormData, formKey, required } = props;
    const [inputValue, setInputValue] = useState(defaultValue ? defaultValue : "");

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        const date = new Date(value);
        setInputValue(value);
        setFormData((previousValue: CardInterface) => ({ ...previousValue, [formKey]: date }));
    };

    return (
        <>
            <label htmlFor="" className="input">
                <span className="input__label">{label}</span>
                <input
                    onChange={onChange}
                    className="input__input"
                    type="date"
                    value={inputValue ? inputValue : ""}
                    required={required}
                />
            </label>
        </>
    );
};
