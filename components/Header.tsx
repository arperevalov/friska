import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header () {

    const router = useRouter();
    const [active, setActive] = useState(false);

    const toggleHeader = () => {
        setActive(!active)
    }

    return <>
        <header className={`header ${active ? 'active' : ''}`}>
            <div className="header__dropdown">
                <nav className="header__nav">
                    <Link className={`header__link ${router.pathname === '/' ? 'active' : '' } h3`} href={'/'}>Lists</Link>
                    <Link className={`header__link ${router.pathname === '/settings' ? 'active' : '' } h3`} href={'/settings'}>Settings</Link>
                </nav>
            </div>
            <button type="button" className="header__logo" onClick={toggleHeader}>Friska</button>
        </header>
    </>
}