"use client";

import { useRouter } from "next/navigation";
import Sprite from "@/components/Sprite";

interface HeaderSimpleProps {
    title: string;
}

export default function HeaderSimple(props: HeaderSimpleProps) {
    const { title } = props;
    const router = useRouter();

    return (
        <>
            <header className={`header`}>
                <div className="header__top">
                    <div className="header__inner">
                        <div className="header__element">
                            <button
                                onClick={() => {
                                    router.back();
                                }}
                                className="header__button"
                            >
                                <span className="visually-hidden">Go back</span>
                                <Sprite className="header__icon" name={"btn-arrow-back"} />
                            </button>
                        </div>
                        <h1 className="header__title">{title}</h1>
                        <div className="header__element"></div>
                    </div>
                </div>
            </header>
        </>
    );
}
