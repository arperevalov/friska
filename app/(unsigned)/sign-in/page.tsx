"use client";

import HeaderSimple from "@/components/HeaderSimple";
import { Input } from "@/components/Input";
import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
    username: string;
    password: string;
}

export default function SignIn() {
    const { register, handleSubmit } = useForm<FormValues>();
    const { signInAction } = useAuth();

    const submitForm: SubmitHandler<FormValues> = (data) => {
        signInAction(data);
    };

    return (
        <>
            <HeaderSimple title="Sign-in" />
            <main>
                <div className="container">
                    <form className="form" action="#" onSubmit={handleSubmit(submitForm)}>
                        <Input type="text" label="Login" register={register} formKey="username" required={true} />
                        <Input
                            type="password"
                            label="Password"
                            register={register}
                            formKey="password"
                            required={true}
                        />
                        <button className="form__btn-sub link link--primary">Recover password</button>
                        <button className="form__btn btn btn--primary" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
