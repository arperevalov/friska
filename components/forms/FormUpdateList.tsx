import useLists from "@/hooks/useLists";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";

interface FormValues {
    title: string;
    best_before: string;
}

interface FormUpdateListProps {
    onSubmit?: CallableFunction;
    parameters: string | number | null;
}

export default function FormUpdateList(props: FormUpdateListProps) {
    const { onSubmit, parameters } = props;
    const { lists, removeListAction } = useLists();
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const { updateListAction } = useLists();
    let listId = parameters;

    if (listId === null || listId === undefined) return;
    if (typeof listId === "string") listId = parseInt(listId, 10);

    const index = lists.findIndex((item) => item.id === listId);
    const list = lists[index];

    const submitForm: SubmitHandler<FormValues> = (data) => {
        const formattedData = {
            ...data,
            id: list.id,
            user_id: list.user_id,
            best_before: parseInt(data.best_before, 10),
        };
        updateListAction(formattedData);
        reset();
        if (onSubmit) onSubmit();
    };

    const onRemoveList = () => {
        removeListAction(list.id).then(() => {
            if (onSubmit) onSubmit();
        });
    };

    if (!list) return;

    return (
        <>
            <form className="form" action="#" onSubmit={handleSubmit(submitForm)}>
                <Input
                    formKey="title"
                    label="Title"
                    register={register}
                    type="text"
                    required
                    defaultValue={list.title}
                />
                <Input
                    formKey="best_before"
                    label="Best before limit, days"
                    min={0}
                    step={1}
                    register={register}
                    defaultValue={list.best_before}
                    type="number"
                    required
                />

                <button className="form__btn btn btn--primary" type="submit">
                    Save
                </button>
                <button className="form__btn btn btn--secondary" onClick={onRemoveList} type="button">
                    Remove
                </button>
            </form>
        </>
    );
}
