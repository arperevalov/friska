"use client";

import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { InputCalendar } from "@/components/InputCalendar";
import { Select } from "@/components/Select";
import { SelectUnits } from "@/components/SelectUnits";
import Units from "@/enums/Units";
import useCards from "@/hooks/useCards";
import useLists from "@/hooks/useLists";
import CardInterface from "@/interfaces/Card";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
    title: string;
    exp_date: string;
    left_count: string;
    units: string;
    list_id: string;
}

export default function Update({ params }: { params: { id: string } }) {
    const { id } = params;

    const { register, handleSubmit } = useForm<FormValues>();
    const { updateCardAction, getCardAction } = useCards();
    const { lists } = useLists();
    const [card, setCard] = useState<CardInterface | null>(null);
    const units = Object.keys(Units);

    const submitForm: SubmitHandler<FormValues> = (data) => {
        updateCardAction({
            ...data,
            id: parseInt(id, 10),
            exp_date: new Date(data.exp_date).toISOString().replace(/(\d)T(\d.{0,})\.\d{0,}Z/, "$1 $2"),
            list_id: parseInt(data.list_id, 10),
            left_count: parseInt(data.left_count, 10),
            user_id: 1,
        });
    };

    useEffect(() => {
        if (!id) return;
        getCardAction(id).then((result) => {
            setCard(result);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!card) return;

    return (
        <>
            <Header title={card.title} />
            <main>
                <div className="container">
                    <form className="form" action="#" onSubmit={handleSubmit(submitForm)}>
                        <Input
                            type="text"
                            label="Title"
                            defaultValue={card.title}
                            formKey="title"
                            required={true}
                            register={register}
                        />
                        <Select
                            label="List"
                            values={lists}
                            defaultValue={card.list_id}
                            formKey="list_id"
                            required={true}
                            register={register}
                        />
                        <InputCalendar
                            label="Best Before"
                            defaultValue={new Date(card.exp_date)}
                            formKey="exp_date"
                            required={true}
                            register={register}
                        />
                        <div className="input-row">
                            <div className="input-row__col">
                                <Input
                                    type="number"
                                    label="Left"
                                    defaultValue={card.left_count}
                                    formKey="left_count"
                                    required={true}
                                    register={register}
                                />
                            </div>
                            <div className="input-row__col">
                                <SelectUnits
                                    label="Units"
                                    values={units}
                                    formKey="units"
                                    required={true}
                                    register={register}
                                />
                            </div>
                        </div>

                        <button className="form__btn btn btn--primary" type="submit">
                            Save
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
