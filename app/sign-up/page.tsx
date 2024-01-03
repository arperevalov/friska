"use client";

import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { InputAction } from "@/components/InputAction";
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
            signUpAction(data);
        }
    };

    const callAction = () => {};

    return (
        <>
            <Header title="Sign-up" />
            <main>
                <div className="container">
                    <form className="form" action="#" onSubmit={handleSubmit(submitForm)}>
                        <Input type="text" label="Login" register={register} formKey="username" required={true} />
                        <InputAction
                            type="email"
                            label="E-mail"
                            register={register}
                            formKey="email"
                            required={true}
                            buttonAction={callAction}
                            buttonText="Validate"
                        />
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
                            Add new
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
