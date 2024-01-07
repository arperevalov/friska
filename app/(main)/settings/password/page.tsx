"use client";

import Header from "@/components/Header";
import { Input } from "@/components/Input";
import useCurrentUser from "@/hooks/useCurrentUser";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
    password: string;
    password_repeat: string;
}

export default function Settings() {
    const { register, handleSubmit } = useForm<FormData>();
    const { } = useCurrentUser();

    const onFormSubmit: SubmitHandler<FormData> = () => {
        //
    }

    return (
        <>
            <Header title="Change Password" />
            <main>
                <div className="container">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
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
                    </form>
                </div>
            </main>
        </>
    );
}
