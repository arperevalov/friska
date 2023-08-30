import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {
    title?: string;
}

export default function Header(props: HeaderProps) {
    const { title } = props;
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
                                            <path d="M8 1L2 7L8 13" stroke="black" stroke-width="2" />
                                        </svg>
                                    </button>
                                </div>
                                <h1 className="header__title">{title}</h1>
                                <div className="header__element"></div>
                            </div>
                        </>
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
