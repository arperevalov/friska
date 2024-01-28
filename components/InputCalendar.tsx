export interface InputInterface {
    label: string;
    defaultValue?: Date | null;
    formKey: string;
    required?: boolean;
    register: CallableFunction;
    autoComplete?: string;
}

export const InputCalendar = (props: InputInterface) => {
    const { label, defaultValue, formKey, required, register, autoComplete } = props;

    return (
        <>
            <label htmlFor="" className="input">
                <span className="input__label">{label}</span>
                <input
                    className="input__input"
                    type="date"
                    required={required}
                    defaultValue={defaultValue ? defaultValue.toLocaleDateString("sv-SE") : ""}
                    {...register(formKey)}
                    autoComplete={autoComplete}
                />
            </label>
        </>
    );
};
