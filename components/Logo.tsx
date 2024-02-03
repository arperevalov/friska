import Sprite from "./Sprite";

export default function Logo() {
    return (
        <>
            <div className="logo">
                <div className="logo__icon">
                    <Sprite name="friska" />
                </div>
                Friska
            </div>
        </>
    );
}
