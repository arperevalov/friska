import Link from "next/link";
import { useRouter } from "next/router";

export default function Header () {

    const router = useRouter();

    return <>
        <header className={`header`}>
            <div className="header__top">
                { router.pathname === '/' ? <>
                    <div className="header__logo">    
                        <img className="header__logo-icon" src="/friska.svg" alt="" />
                        Friska
                    </div>
                </> : <></>}
            </div>

            <div className="header__bottom">
                <nav className="header__nav">
                    <Link className={`header__link${router.pathname === '/new' ? ' header__link--active' : ''}`} href={'/new'}>
                        <img src="/svg/new.svg" alt="" />
                        <span className="visually-hidden">New Item</span>
                    </Link>
                    <Link className={`header__link${router.pathname === '/' ? ' header__link--active' : ''}`} href={'/'}>
                        <img src="/svg/lists.svg" alt="" />
                        <span className="visually-hidden">Lists</span>
                    </Link>
                    <Link className={`header__link${router.pathname === '/settings' ? ' header__link--active' : ''}`} href={'/settings'}>
                        <img src="/svg/settings.svg" alt="" />
                        <span className="visually-hidden">Settings</span>
                    </Link>
                </nav>
            </div>
            
        </header>
    </>
}