import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();

    return (
        <>
            <header className={`header`}>
                <div className="header__top">
                    {router.pathname === "/" ? (
                        <>
                            <div className="header__logo">
                                <div className="header__logo-icon">
                                    <Image src="/friska.svg" alt="" fill />
                                </div>
                                Friska
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="header__bottom">
                    <nav className="header__nav">
                        <Link
                            className={`header__link${router.pathname === "/new" ? " header__link--active" : ""}`}
                            href={"/new"}
                        >
                            <div className="header__icon">
                                <Image src="/svg/new.svg" alt="" fill />
                            </div>
                            <span className="visually-hidden">New Item</span>
                        </Link>
                        <Link
                            className={`header__link${router.pathname === "/" ? " header__link--active" : ""}`}
                            href={"/"}
                        >
                            <div className="header__icon">
                                <Image src="/svg/lists.svg" alt="" fill />
                            </div>
                            <span className="visually-hidden">Lists</span>
                        </Link>
                        <Link
                            className={`header__link${router.pathname === "/settings" ? " header__link--active" : ""}`}
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
