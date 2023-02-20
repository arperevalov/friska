export interface InputInterface {
    label: string,
    defaultValue?: string | null | number ,
    type: string,
}

export const Input = (props: InputInterface) => {
    const { label, defaultValue, type } = props;

    return <>
        <label htmlFor="" className="input">
            <span className="input__label h3">{label}</span>
            <input className="input__input" type={ type } value={ defaultValue ? defaultValue : undefined}/>
        </label>
    </>
}