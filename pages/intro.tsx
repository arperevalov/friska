import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Intro() {
    return (
        <>
            <Head>
                <title>Friska</title>
                <meta name="description" content="Storage management app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="intro-cards"></div>
                <div className="container">
                    <div className="intro">
                        <div className="intro__logo">
                            <div className="intro__logo-icon">
                                <Image src="/friska.svg" alt="" fill />
                            </div>
                            Friska
                        </div>
                        <h1 className="intro__title">Hello, there</h1>
                        <p className="intro__text">
                            Friska is a simple and intuitive web application designed to help you manage the expiry
                            dates of your food and medicine.
                        </p>
                        <div className="btn-row">
                            <Link href={"./sign-in"} className="btn btn--sm btn--primary">
                                Sign-in
                            </Link>
                            <Link href={"./sign-in"} className="btn btn--sm btn--outline-primary">
                                Sign-up
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
