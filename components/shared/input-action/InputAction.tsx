export interface InputActionInterface {
    label: string;
    defaultValue?: string | null | number;
    type: string;
    min?: number;
    max?: number;
    formKey: string;
    required?: boolean;
    buttonAction: CallableFunction;
    buttonText: string;
    register: CallableFunction;
    autoComplete?: string;
}

export const InputAction = ({ label, defaultValue, type, min, max, formKey, required, buttonAction, buttonText, register, autoComplete }: InputActionInterface) => {

    const onButtonClick = () => {
        buttonAction();
    };

    return (
        <>
            <label htmlFor="" className="input">
                <span className="input__label">{label}</span>
                <input
                    {...register(formKey)}
                    className="input__input"
                    type={type}
                    defaultValue={defaultValue}
                    min={min}
                    max={max}
                    required={required}
                    autoComplete={autoComplete}
                />
                <button className="input__button link link--primary" type="button" onClick={onButtonClick}>
                    {buttonText}
                </button>
            </label>
        </>
    );
};
