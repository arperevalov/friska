import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header () {

    const router = useRouter();

    return <>
        <header className={`header`}>
            { router.pathname === '/' ? <>
                <div className="header__top">
                    <div className="header__logo">Friska</div>
                </div>
            </> : ''}

            <div className="header__bottom">
                <nav className="header__nav">
                    <Link className={`header__link header__link--new h3`} href={'/new'}>
                        <img src="/svg/new.svg" alt="" />
                        <span className="visually-hidden">New Item</span>
                    </Link>
                    <Link className={`header__link h3`} href={'/'}>
                        <img src="/svg/lists.svg" alt="" />
                        <span className="visually-hidden">Lists</span>
                    </Link>
                    <Link className={`header__link h3`} href={'/settings'}>
                        <img src="/svg/settings.svg" alt="" />
                        <span className="visually-hidden">Settings</span>
                    </Link>
                </nav>
            </div>
            
        </header>
    </>
}