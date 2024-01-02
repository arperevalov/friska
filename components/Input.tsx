export interface InputInterface {
    label: string;
    defaultValue?: string | null | number;
    type: string;
    min?: number;
    max?: number;
    step?: number;
    formKey: string;
    required?: boolean;
    register: CallableFunction;
}

export const Input = (props: InputInterface) => {
    const { label, type, min, max, step, defaultValue, formKey, required, register } = props;

    return (
        <>
            <label htmlFor="" className="input">
                <span className="input__label">{label}</span>
                <input
                    className="input__input"
                    type={type}
                    min={min}
                    max={max}
                    step={step}
                    required={required}
                    defaultValue={defaultValue}
                    {...register(formKey)}
                />
            </label>
        </>
    );
};
