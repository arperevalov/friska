import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { InputCalendar } from "@/components/InputCalendar";
import { Select } from "@/components/Select";
import useLists from "@/hooks/useLists";
import CardInterface from "@/interfaces/Card";
import { useMainStore } from "@/store/MainStore";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Update() {
    const router = useRouter();
    const { id } = router.query;

    const { updateCard, lists } = useMainStore((store) => store);
    const [formData, setFormData] = useState({});

    const submitForm = () => {
        updateCard([formData]);
    };

    const requestCard = async (id: any) => {
        try {
            const request = await fetch(`/api/cards/${id}`);
            const requestJSON = await request.json();
            return requestJSON.cards[0];
        } catch (error) {
            Error("Dunno how");
        }
    };

    useLists();

    const [card, setCard] = useState<CardInterface | null>(null);

    if (!id) return;

    requestCard(id).then((result) => {
        setCard(result);
    });

    if (!card) return;

    return (
        <>
            <Header />
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
                            defaultValue={card.expDate}
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
                                />
                            </div>
                            <div className="input-row__col">
                                <Input
                                    type="text"
                                    label="Units"
                                    defaultValue={card.units}
                                    setFormData={setFormData}
                                    formKey="units"
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
