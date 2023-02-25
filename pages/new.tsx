import Header from "@/components/Header"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"
import { useMainStore } from ".";
import { useState } from "react";

export default function New () {

    const { setCards, lists } = useMainStore(store => store);
    const [formData, setFormData] = useState({});

    const submitForm = () => {
        debugger
        setCards(formData)
    }

    return <>
        <Header/>
        <main>
            <div className="container">
                <form action="#" onSubmit={(event: React.FormEvent)=>{
                    event.preventDefault()
                    submitForm()
                }}>
                    <Input type="string" label="Title" setFormData={setFormData} formKey="title"/>
                    <Select label="Category" values={lists} setFormData={setFormData} formKey="listId"/>
                    <Input type="string" label="Best Before" setFormData={setFormData} formKey="expDate"/>
                    <Input type="string" label="Left" setFormData={setFormData} formKey="left"/>
                    <Input type="string" label="Units" setFormData={setFormData} formKey="units"/>
                    <button className="btn btn--primary" type="submit">Add new</button>
                </form>
            </div>
        </main>
    </>
}