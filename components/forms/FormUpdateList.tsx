import useLists from "@/hooks/useLists";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { useState } from "react";

interface FormValues {
    title: string;
    best_before: string;
}

interface FormUpdateListProps {
    onSubmit?: CallableFunction;
    listId: number;
    cardsLength: number;
}

export default function FormUpdateList(props: FormUpdateListProps) {
    const { onSubmit, listId, cardsLength } = props;
    const { lists, removeListAction } = useLists();
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const { updateListAction } = useLists();
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

    if (listId === null || listId === undefined) return;

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
        setShowConfirm(true);
    };

    const onRemoveListConfirm = () => {
        removeListAction(list.id).then(() => {
            if (onSubmit) onSubmit();
        });
    };

    const onRemoveListReject = () => {
        setShowConfirm(false);
    };

    if (!list) return;

    return (
        <>
            <div className={`form-container${showConfirm ? " show" : ""}`}>
                <form className="form form-container__main" action="#" onSubmit={handleSubmit(submitForm)}>
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
                    <button
                        className="form__btn btn btn--secondary"
                        onClick={cardsLength > 0 ? onRemoveList : onRemoveListConfirm}
                        type="button"
                    >
                        Remove
                    </button>
                </form>
                <div className="form-container__confirmation">
                    <div className="form-container__text-wrapper">
                        <p className="form-container__text">
                            You are about to delete list <strong>{list.title}</strong> that contains cards. <br />
                        </p>
                        <p className="form-container__text">
                            This action will result in the deletion of all cards belonging to this list.
                        </p>
                        <p className="form-container__text">Are you sure you want to proceed?</p>
                    </div>
                    <button className="form__btn btn btn--primary" onClick={onRemoveListConfirm} type="submit">
                        Yes, I want to proceed!
                    </button>
                    <button className="form__btn btn btn--secondary" onClick={onRemoveListReject} type="button">
                        No, leave it as it is
                    </button>
                </div>
            </div>
        </>
    );
}
