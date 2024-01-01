"use client";

import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { InputCalendar } from "@/components/InputCalendar";
import { Select } from "@/components/Select";
import { SelectUnits } from "@/components/SelectUnits";
import Units from "@/enums/Units";
import useCards from "@/hooks/useCards";
import useLists from "@/hooks/useLists";
import { useState } from "react";

export default function New() {
    const { addCardAction } = useCards();
    const { lists } = useLists();
    const [formData, setFormData] = useState({
        title: "",
        exp_date: new Date(),
        left_count: "",
        units: Units.kg,
        list_id: 0,
    });
    const units = Object.keys(Units);

    const submitForm = () => {
        const formattedData = {
            ...formData,
            left_count: parseInt(formData.left_count, 10),
            user_id: 0,
        };
        addCardAction(formattedData);
    };

    if (!lists) return <></>;

    return (
        <>
            <Header title="New" />
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
                        formKey="list_id"
                        required={true}
                    />
                    <InputCalendar label="Best Before" setFormData={setFormData} formKey="exp_date" required={true} />
                    <div className="input-row">
                        <div className="input-row__col">
                            <Input
                                type="number"
                                label="Left"
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
                        Add new
                    </button>
                </form>
            </div>
        </>
    );
}
