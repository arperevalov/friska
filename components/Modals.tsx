import ModalsEnum from "@/enums/Modals";

interface ModalsProps {
    modals: { [ModalsEnum.FormNewCard]: boolean };
}

export default function Modals(props: ModalsProps) {
    const { modals } = props;
    return (
        <>
            <div className={`modal${modals[ModalsEnum.FormNewCard] ? " show" : ""}`}></div>
        </>
    );
}
