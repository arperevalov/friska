import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { InputCalendar } from "@/components/InputCalendar";
import { Select } from "@/components/Select";
import useLists from "@/hooks/useLists";
import CardInterface from "@/interfaces/Card";
import { useMainStore } from "@/store/MainStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Update() {
    const router = useRouter();
    const id = router.query.id as string;

    const { updateCard, lists } = useMainStore((store) => store);
    const [formData, setFormData] = useState({});

    const submitForm = () => {
        updateCard(formData);
    };

    useLists();

    const [card, setCard] = useState<CardInterface | null>(null);

    useEffect(() => {
        if (!id) return;
        const requestCard = async (id: string) => {
            const request = await fetch(`/api/cards/${id}`);
            const requestJSON = await request.json();
            return requestJSON.cards[0];
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
            <Header title={card.title} />
            <main>
                <div className="container">
                    <form
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
                            defaultValue={card.listId}
                            setFormData={setFormData}
                            formKey="listId"
                            required={true}
                        />
                        <InputCalendar
                            label="Best Before"
                            defaultValue={new Date(card.expDate).toLocaleDateString("sv-SE")}
                            setFormData={setFormData}
                            formKey="expDate"
                            required={true}
                        />
                        <div className="input-row">
                            <div className="input-row__col">
                                <Input
                                    type="number"
                                    label="Left"
                                    defaultValue={card.left}
                                    setFormData={setFormData}
                                    formKey="left"
                                    required={true}
                                />
                            </div>
                            <div className="input-row__col">
                                <Input
                                    type="text"
                                    label="Units"
                                    defaultValue={card.units}
                                    setFormData={setFormData}
                                    formKey="units"
                                    required={true}
                                />
                            </div>
                        </div>

                        <button className="btn btn--primary" type="submit">
                            Save
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
