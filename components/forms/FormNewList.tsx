import useLists from "@/hooks/useLists";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";

interface FormValues {
    title: string;
    best_before: string;
}

interface FormNewListProps {
    onSubmit?: CallableFunction;
}

export default function FormNewList(props: FormNewListProps) {
    const { onSubmit } = props;
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const { addListAction } = useLists();

    const submitForm: SubmitHandler<FormValues> = (data) => {
        const formattedData = {
            ...data,
            best_before: parseInt(data.best_before, 10),
        };
        addListAction(formattedData);
        reset();
        if (onSubmit) onSubmit();
    };

    return (
        <>
            <form className="form" action="#" onSubmit={handleSubmit(submitForm)}>
                <Input formKey="title" label="Title" register={register} type="text" required />
                <Input
                    formKey="best_before"
                    label="Left"
                    min={0}
                    step={1}
                    register={register}
                    defaultValue={1}
                    type="number"
                    required
                />
                <button className="form__btn btn btn--primary" type="submit">
                    Add new
                </button>
            </form>
        </>
    );
}
