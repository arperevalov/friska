interface ModalTitleProps {
    children: React.ReactNode
}

export default function ModalTitle(props: ModalTitleProps) {
    const { children } = props;
    return (
        <>
            <h3 className="modal__title">
                {children}
            </h3>
        </>
    );
}
