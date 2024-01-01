"use client";

import Header from "@/components/Header";
import Units from "@/enums/Units";
import useCards from "@/hooks/useCards";
import useLists from "@/hooks/useLists";
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
    if (lists.length === 0) return <></>

    return (
        <>
            <Header title="New" />
            <div className="container">
                <form
                    className="form"
                    action="#"
                    onSubmit={handleSubmit(submitForm)}
                >
                    <label htmlFor="" className="input">
                        <span className="input__label">Title</span>
                        <input
                            className="input__input"
                            type="text"
                            required
                            {...register('title')}
                        />
                    </label>
                    <label htmlFor="" className="input">
                        <span className="input__label">Category</span>
                        <select defaultValue={lists[0].id} className="input__input" required {...register("list_id")}>
                            {lists.map((value) => {
                                return (
                                    <option key={value.id} value={value.id}>
                                        {value.title}
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                    <label htmlFor="" className="input">
                        <span className="input__label">Best Before</span>
                        <input
                            className="input__input"
                            type="date"
                            required
                            {...register('exp_date')}
                        />
                    </label>
                    <div className="input-row">
                        <div className="input-row__col">
                            <label htmlFor="" className="input">
                                <span className="input__label">Left</span>
                                <input
                                    className="input__input"
                                    type="number"
                                    step={0.1}
                                    required
                                    {...register('left_count')}
                                />
                            </label>
                        </div>
                        <div className="input-row__col">
                            <label htmlFor="" className="input">
                                <span className="input__label">Units</span>
                                <select defaultValue={0} className="input__input" required {...register("units")}>
                                    {units.map((value) => {
                                        return (
                                            <option key={value} value={value}>
                                                {value}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
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
