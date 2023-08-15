import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import useLists from "@/hooks/useLists";
import CardInterface from "@/interfaces/Card";
import { useMainStore } from "@/store/MainStore";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Update () {

    const router = useRouter();
    const id = router.query.id;

    const { updateCard, lists } = useMainStore(store => store);
    const [formData, setFormData] = useState({});

    const submitForm = () => {
        updateCard([formData])
    }

    const requestCard = async (id: any) => {
        try {
            const request = await fetch(`/api/cards/${id}`);
            const requestJSON = await request.json();
            return requestJSON.cards[0]
        } catch (error) {
            Error('Dunno how');
        }
    }

    useLists()

    const [card, setCard] = useState<CardInterface | null>(null);

    if (!id) return;

    requestCard(id).then((result)=> {
        setCard(result)
    })

    if (!card) return;
    
    return <>
        <Header/>
        <main>
            <div className="container">
                <form action="#" onSubmit={(event: React.FormEvent)=>{
                        event.preventDefault()
                        submitForm()
                    }}>
                    <Input type="string" label="Title" defaultValue={card.title} setFormData={setFormData} formKey="title"/>
                    <Select label="Category" values={lists} formKey="listId" defaultValue={card.listId} setFormData={setFormData}/>
                    <Input type="string" label="Best Before" defaultValue={card.expDate} setFormData={setFormData} formKey="expDate"/>
                    <div className="input-row">
                        <div className="input-row__col">
                            <Input type="string" label="Left" setFormData={setFormData} formKey="left"/>
                        </div>
                        <div className="input-row__col">
                            <Input type="string" label="Units" setFormData={setFormData} formKey="units"/>
                        </div>
                    </div>

                    <button className="btn btn--primary" type="submit">Save</button>
                </form>
            </div>
        </main>
    </>
}