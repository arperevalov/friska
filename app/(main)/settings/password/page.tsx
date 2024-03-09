"use client";

import Header from "@/components/Header";
import { Input } from "@/components/Input";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
    password: string;
    password_repeat: string;
}

function ChangePassword(): ReactNode {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const { updatePasswordAction } = useCurrentUser();

    const onFormSubmit: SubmitHandler<FormData> = (data) => {
        if (data.password !== data.password_repeat) return;
        updatePasswordAction(data).then((result) => {
            if (result && result.status === 200) reset();
        });
    };

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
                            formKey="password_repeat"
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
export default ChangePassword;
