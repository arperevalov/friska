"use client";

import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";

interface HeaderProps {
    title?: string;
}

export default function Header(props: HeaderProps) {
    const { title } = props;
    const pathname = usePathname();
    const router = useRouter();

    const onLogoutClick = () => {
        deleteCookie("auth-token");
        router.push("/intro");
    };

    return (
        <>
            <header className={`header`}>
                <div className="header__top">
                    {pathname === "/" ? ( <Logo/>
                    ) : (
                        <>
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
                                <div className="header__element">
                                    {pathname === "/settings" ? (
                                        <>
                                            <button
                                                className="link link--secondary"
                                                onClick={onLogoutClick}
                                                type="button"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="header__bottom">
                    <nav className="header__nav">
                        <Link
                            className={`header__link${pathname === "/new" ? " header__link--active" : ""}`}
                            href={"/new"}
                        >
                            <div className="header__icon">
                                <Image src="/svg/new.svg" alt="" fill />
                            </div>
                            <span className="visually-hidden">New Item</span>
                        </Link>
                        <Link className={`header__link${pathname === "/" ? " header__link--active" : ""}`} href={"/"}>
                            <div className="header__icon">
                                <Image src="/svg/lists.svg" alt="" fill />
                            </div>
                            <span className="visually-hidden">Lists</span>
                        </Link>
                        <Link
                            className={`header__link${pathname === "/settings" ? " header__link--active" : ""}`}
                            href={"/settings"}
                        >
                            <div className="header__icon">
                                <Image src="/svg/settings.svg" alt="" fill />
                            </div>
                            <span className="visually-hidden">Settings</span>
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    );
}
