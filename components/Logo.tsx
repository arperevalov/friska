import Image from "next/image";

export default function Logo() {
    return (
        <>
            <div className="logo">
                <div className="logo__icon">
                    <Image src="/svg/friska.svg" alt="" fill />
                </div>
                Friska
            </div>
        </>
    );
}
