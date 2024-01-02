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
}

export const InputAction = (props: InputActionInterface) => {
    const { label, defaultValue, type, min, max, formKey, required, buttonAction, buttonText, register } = props;

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
                />
                <button className="input__button link link--primary" type="button" onClick={onButtonClick}>
                    {buttonText}
                </button>
            </label>
        </>
    );
};
