import Link from "next/link";

export default function Header () {
    return <>
        <header className="header">
            <Link className="header__logo" href={'/'}>Friska</Link>
        </header>
    </>
}