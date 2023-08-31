import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { InputCalendar } from "@/components/InputCalendar";
import { Select } from "@/components/Select";
import { SelectUnits } from "@/components/SelectUnits";
import Units from "@/enums/Units";
import useLists from "@/hooks/useLists";
import { useMainStore } from "@/store/MainStore";
import { useState } from "react";

export default function New() {
    const { addCard, lists } = useMainStore((store) => store);
    const [formData, setFormData] = useState({});
    const units = Object.keys(Units);

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
                        className="form"
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
                                <Input
                                    type="number"
                                    label="Left"
                                    setFormData={setFormData}
                                    formKey="left"
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
                            Add new
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
