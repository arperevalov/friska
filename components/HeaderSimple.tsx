"use client";

import { useRouter } from "next/navigation";

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
                                <svg
                                    width="9"
                                    height="14"
                                    viewBox="0 0 9 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8 1L2 7L8 13" stroke="black" strokeWidth="2" />
                                </svg>
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
