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
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { id } = params;

    const { updateCard } = useCards();
    const { lists } = useLists();
    const [formData, setFormData] = useState({});
    const units = Object.keys(Units);

    const submitForm = () => {
        axios
            .put(`/api/cards/${id}`, formData)
            .then((response) => {
                return response.data;
            })
            .then(() => {
                updateCard(formData);
                router.push("/");
            });
    };

    const [card, setCard] = useState<CardInterface | null>(null);

    useEffect(() => {
        if (!id) return;
        const requestCard = async (id: string) => {
            const request = await axios.get(`/api/cards/${id}`);
            const requestJSON = await request.data;
            return requestJSON;
        };
        requestCard(id).then((result) => {
            setCard(result);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!card) return;
        setFormData((previousValue) => ({ ...previousValue, ...card }));
    }, [card]);

    if (!card) return;

    return (
        <>
            <Head>
                <title>Edit {card.title} — Friska</title>
                <meta name="description" content="Storage management app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title={card.title} />
            <main>
                <div className="container">
                    <form
                        className="form"
                        action="#"
                        onSubmit={(event: React.FormEvent) => {
                            event.preventDefault();
                            submitForm();
                        }}
                    >
                        <Input
                            type="text"
                            label="Title"
                            defaultValue={card.title}
                            setFormData={setFormData}
                            formKey="title"
                            required={true}
                        />
                        <Select
                            label="Category"
                            values={lists}
                            defaultValue={card.list_id}
                            setFormData={setFormData}
                            formKey="list_id"
                            required={true}
                        />
                        <InputCalendar
                            label="Best Before"
                            defaultValue={new Date(card.exp_date)}
                            setFormData={setFormData}
                            formKey="exp_date"
                            required={true}
                        />
                        <div className="input-row">
                            <div className="input-row__col">
                                <Input
                                    type="number"
                                    label="Left"
                                    defaultValue={card.left_count}
                                    setFormData={setFormData}
                                    formKey="left_count"
                                    required={true}
                                />
                            </div>
                            <div className="input-row__col">
                                <SelectUnits
                                    label="Units"
                                    values={units}
                                    setFormData={setFormData}
                                    formKey="units"
                                    required={true}
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
