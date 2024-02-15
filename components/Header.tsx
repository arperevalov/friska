"use client";

import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import useModals from "@/hooks/useModals";
import ModalsEnum from "@/enums/Modals";
import Sprite from "@/components/Sprite";
import FormNewCard from "./forms/FormNewCard";

interface HeaderProps {
    title?: string;
}

export default function Header(props: HeaderProps) {
    const { title } = props;
    const pathname = usePathname();
    const router = useRouter();
    const { toggleModalAction, closeModalAction } = useModals();

    const onLogoutClick = () => {
        deleteCookie("auth-token");
        router.push("/intro");
    };

    const onNewClick = () => {
        const formType = ModalsEnum.FormNewCard;
        toggleModalAction(
            formType, 
            <FormNewCard 
                onSubmit={()=>{closeModalAction(formType)}}/>
        );
    };

    return (
        <>
            <header className={`header`}>
                <div className="header__top">
                    {pathname === "/" ? (
                        <Logo />
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
                                        <Sprite className="header__icon" name={"btn-arrow-back"} />
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
                        <button className="header__link" type="button" onClick={onNewClick}>
                            <Sprite className="header__icon" name="new" />
                            <span className="visually-hidden">New Item</span>
                        </button>
                        <Link className={`header__link${pathname === "/" ? " header__link--active" : ""}`} href={"/"}>
                            <Sprite className="header__icon" name="lists" />
                            <span className="visually-hidden">Lists</span>
                        </Link>
                        <Link
                            className={`header__link${pathname === "/settings" ? " header__link--active" : ""}`}
                            href={"/settings"}
                        >
                            <Sprite className="header__icon" name="settings" />
                            <span className="visually-hidden">Settings</span>
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    );
}
