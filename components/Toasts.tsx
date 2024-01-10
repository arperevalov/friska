import { ToastBodyInterface } from "@/contexts/ToastsContext";
import { useEffect, useState } from "react";

interface ToastsProps {
    toasts: ToastBodyInterface[];
}

export default function Toasts(props: ToastsProps) {
    const { toasts } = props;

    return (
        <>
            <div className="toasts">
                <div className="toasts__container">
                    {toasts.map((item, index) => (
                        <ToastElement key={index} {...item} />
                    ))}
                </div>
            </div>
        </>
    );
}

function ToastElement(props: ToastBodyInterface) {
    const { message } = props;
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <div className={`${show ? "" : "visually-hidden"}`}>{message}</div>
        </>
    );
}
