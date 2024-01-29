export interface SelectUnitsInterface {
    values: string[];
    defaultValue?: string;
    label: string;
    formKey: string;
    required?: boolean;
    register: CallableFunction;
}

export const SelectUnits = (props: SelectUnitsInterface) => {
    const { label, defaultValue, values, formKey, required, register } = props;

    return (
        <>
            <label htmlFor="" className="input">
                <span className="input__label">{label}</span>
                <select defaultValue={defaultValue} {...register(formKey)} className="input__input" required={required}>
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
