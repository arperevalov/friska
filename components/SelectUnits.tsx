import CardInterface from "@/interfaces/Card";
import { useEffect, useState } from "react";

export interface SelectUnitsInterface {
    label: string;
    values: string[];
    defaultValue?: number;
    setFormData: CallableFunction;
    formKey: string;
    required?: boolean;
}

export const SelectUnits = (props: SelectUnitsInterface) => {
    const { label, defaultValue, values, setFormData, formKey, required } = props;
    const [inputValue, setInputValue] = useState(defaultValue ? defaultValue : values[0]);

    useEffect(() => {
        setFormData((previousValue: CardInterface) => ({ ...previousValue, [formKey]: inputValue }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        setInputValue(value);
        setFormData((previousValue: CardInterface) => ({ ...previousValue, [formKey]: value }));
    };

    return (
        <>
            <label htmlFor="" className="input">
                <span className="input__label">{label}</span>
                <select defaultValue={defaultValue} onChange={onChange} className="input__input" required={required}>
                    {values.map((value, id) => {
                        return (
                            <option key={id} value={value}>
                                {value}
                            </option>
                        );
                    })}
                </select>
            </label>
        </>
    );
};
