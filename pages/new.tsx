import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { InputCalendar } from "@/components/InputCalendar";
import { Select } from "@/components/Select";
import useLists from "@/hooks/useLists";
import { useMainStore } from "@/store/MainStore";
import { useState } from "react";

export default function New() {
    const { addCard, lists } = useMainStore((store) => store);
    const [formData, setFormData] = useState({});

    const submitForm = () => {
        addCard(formData);
    };

    useLists();

    return (
        <>
            <Header title="New" />
            <main>
                <div className="container">
                    <form
                        action="#"
                        onSubmit={(event: React.FormEvent) => {
                            event.preventDefault();
                            submitForm();
                        }}
                    >
                        <Input type="text" label="Title" setFormData={setFormData} formKey="title" required={true} />
                        <Select
                            label="Category"
                            values={lists}
                            setFormData={setFormData}
                            formKey="listId"
                            required={true}
                        />
                        <InputCalendar
                            label="Best Before"
                            setFormData={setFormData}
                            formKey="expDate"
                            required={true}
                        />
                        <div className="input-row">
                            <div className="input-row__col">
                                <Input type="number" label="Left" setFormData={setFormData} formKey="left" />
                            </div>
                            <div className="input-row__col">
                                <Input type="text" label="Units" setFormData={setFormData} formKey="units" />
                            </div>
                        </div>
                        <button className="btn btn--primary" type="submit">
                            Add new
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
