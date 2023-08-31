import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { useState } from "react";

export default function New() {
    const [formData, setFormData] = useState({});

    const submitForm = () => {
        console.log(formData);
    };

    return (
        <>
            <Header title="Sign-in" />
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
                        <Input type="text" label="Login" setFormData={setFormData} formKey="login" required={true} />
                        <Input
                            type="password"
                            label="Password"
                            setFormData={setFormData}
                            formKey="password"
                            required={true}
                        />
                        <button className="form__btn-sub link link--primary">Recover password</button>
                        <button className="form__btn btn btn--primary" type="submit">
                            Add new
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
