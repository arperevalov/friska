import Header from "@/components/Header";
import { Input } from "@/components/Input";
import Head from "next/head";
import { useState } from "react";

export default function SignIn() {
    const [formData, setFormData] = useState({});

    const submitForm = () => {
        console.log(formData);
    };

    return (
        <>
            <Head>
                <title>Sign-in — Friska</title>
                <meta name="description" content="Storage management app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
