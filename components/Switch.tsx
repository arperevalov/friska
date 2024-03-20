interface SwitchInterface {
    register: CallableFunction;
    label: string;
    formKey: string;
    required?: boolean;
    defaultChecked?: boolean;
}

export const Switch = (props: SwitchInterface) => {
    const { register, formKey, required, label, defaultChecked } = props;

    return (
        <label htmlFor="" className="switch">
            <input
                className="switch__input"
                type="checkbox"
                required={required}
                {...register(formKey)}
                defaultChecked={defaultChecked}
            />
            {label}
        </label>
    );
};
