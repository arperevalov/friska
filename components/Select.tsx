export interface SelectInterface {
    values: { title: string; id: number }[];
    defaultValue?: number;
    label: string;
    formKey: string;
    required?: boolean;
    register: CallableFunction;
}

export const Select = (props: SelectInterface) => {
    const { label, defaultValue, values, formKey, required, register } = props;

    return (
        <>
            <label htmlFor="" className="input">
                <span className="input__label">{label}</span>
                <select defaultValue={defaultValue} {...register(formKey)} className="input__input" required={required}>
                    {values.map((value) => {
                        return (
                            <option key={value.id} value={value.id}>
                                {value.title}
                            </option>
                        );
                    })}
                </select>
            </label>
        </>
    );
};
