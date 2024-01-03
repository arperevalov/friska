"use client";

import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { InputCalendar } from "@/components/InputCalendar";
import { Select } from "@/components/Select";
import { SelectUnits } from "@/components/SelectUnits";
import Units from "@/enums/Units";
import useCards from "@/hooks/useCards";
import useLists from "@/hooks/useLists";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
    title: string;
    exp_date: string;
    left_count: string;
    units: string;
    list_id: string;
}

export default function New() {
    const { register, handleSubmit } = useForm<FormValues>();
    const { addCardAction } = useCards();
    const { lists } = useLists();
    const units = Object.keys(Units);

    const submitForm: SubmitHandler<FormValues> = (data) => {
        const formattedData = {
            ...data,
            exp_date: new Date(data.exp_date).toISOString().replace(/(\d)T(\d.{0,})\.\d{0,}Z/, "$1 $2"),
            list_id: parseInt(data.list_id, 10),
            left_count: parseFloat(data.left_count),
            user_id: 1,
        };
        addCardAction(formattedData);
    };

    if (!lists) return <></>;
    if (lists.length === 0)
        return (
            <>
                <Header title="New" />
                <main>
                    <div className="container">
                        <h1 className="h1">There are no lists!</h1>
                        <Link href="/settings" className="link link--primary">
                            Create new at settings
                        </Link>
                    </div>
                </main>
            </>
        );

    return (
        <>
            <Header title="New" />
            <div className="container">
                <form className="form" action="#" onSubmit={handleSubmit(submitForm)}>
                    <Input formKey="title" label="Title" register={register} type="text" required />
                    <Select
                        formKey="list_id"
                        label="Category"
                        values={lists}
                        defaultValue={lists[0].id}
                        register={register}
                        required
                    />
                    <InputCalendar formKey="exp_date" label="Best Before" register={register} required />

                    <div className="input-row">
                        <div className="input-row__col">
                            <Input
                                formKey="left_count"
                                label="Left"
                                step={0.1}
                                register={register}
                                type="number"
                                required
                            />
                        </div>
                        <div className="input-row__col">
                            <SelectUnits
                                formKey="units"
                                label="Units"
                                values={units}
                                defaultValue={0}
                                register={register}
                                required
                            />
                        </div>
                    </div>
                    <button className="form__btn btn btn--primary" type="submit">
                        Add new
                    </button>
                </form>
            </div>
        </>
    );
}
