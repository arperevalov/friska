import IntroCards from "@/components/IntroCards/index";
import { Logo } from "@/components/shared";
import Link from "next/link";

export default function Intro() {
    return (
        <>
            <main>
                <div className="container">
                    <IntroCards />
                    <div className="intro">
                        <div className="intro__content">
                            <div className="intro__logo">
                                <Logo />
                            </div>
                            <h1 className="intro__title">Hello, there</h1>
                            <p className="intro__text">
                                Friska is a simple and intuitive web application designed to help you manage the expiry
                                dates of your food and medicine.
                            </p>
                            <div className="btn-row">
                                <div className="btn-row__item">
                                    <Link href={"./sign-in"} className="btn btn--sm btn--primary">
                                        Sign-in
                                    </Link>
                                </div>
                                <div className="btn-row__item">
                                    <Link href={"./sign-up"} className="btn-row__item btn btn--sm btn--outline-primary">
                                        Sign-up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
