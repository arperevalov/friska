import { Sprite } from "@/components/shared/";

export function Logo() {
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
