import CardInterface from "@/interfaces/Card";
import { useState } from "react";

export interface InputActionInterface {
    label: string;
    defaultValue?: string | null | number;
    type: string;
    min?: number;
    max?: number;
    setFormData: CallableFunction;
    formKey: string;
    required?: boolean;
    buttonAction: CallableFunction;
}

export const InputAction = (props: InputActionInterface) => {
    const { label, defaultValue, type, min, max, setFormData, formKey, required, buttonAction } = props;
    const [inputValue, setInputValue] = useState(defaultValue ? defaultValue : "");

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setInputValue(value);
        setFormData((previousValue: CardInterface) => ({ ...previousValue, [formKey]: value }));
    };

    const onButtonClick = () => {
        buttonAction();
    };

    return (
        <>
            <label htmlFor="" className="input">
                <span className="input__label">{label}</span>
                <input
                    onChange={onChange}
                    className="input__input"
                    type={type}
                    value={inputValue ? inputValue : ""}
                    min={min}
                    max={max}
                    required={required}
                />
                <button className="input__button link link--primary" type="button" onClick={onButtonClick}>
                    Add Category
                </button>
            </label>
        </>
    );
};
