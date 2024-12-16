"use client";

import HeaderSimple from "@/components/HeaderSimple";
import { Input } from "@/components/shared/input/Input";
import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
    username: string;
    email: string;
    password: string;
    passwordSecond: string;
}

export default function SignUp() {
    const { register, handleSubmit } = useForm<FormValues>();
    const { signUpAction } = useAuth();

    const submitForm: SubmitHandler<FormValues> = (data) => {
        if (data.password === data.passwordSecond) {
            const formattedData = {
                ...data,
                username: data.username.trim(),
            };
            signUpAction(formattedData);
        }
    };

    return (
        <>
            <HeaderSimple title="Sign-up" />
            <main>
                <div className="container">
                    <form className="form" action="#" method="POST" onSubmit={handleSubmit(submitForm)}>
                        <Input type="text" label="Login" register={register} formKey="username" required={true} />
                        <Input type="email" label="E-mail" register={register} formKey="email" required={true} />
                        <Input
                            type="password"
                            label="Password"
                            register={register}
                            formKey="password"
                            required={true}
                        />
                        <Input
                            type="password"
                            label="Repeat password"
                            register={register}
                            formKey="passwordSecond"
                            required={true}
                        />
                        <button className="form__btn btn btn--primary" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
