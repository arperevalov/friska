"use client";

import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
    login: string;
    password: string;
}

export default function SignIn() {
    const { register, handleSubmit } = useForm<FormValues>();

    const submitForm: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };

    return (
        <>
            <Header title="Sign-in" />
            <main>
                <div className="container">
                    <form className="form" action="#" onSubmit={handleSubmit(submitForm)}>
                        <Input type="text" label="Login" register={register} formKey="login" required={true} />
                        <Input
                            type="password"
                            label="Password"
                            register={register}
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
