interface ModalHeaderProps {
    children: React.ReactNode
}

export default function ModalHeader(props: ModalHeaderProps) {
    const { children } = props;
    return (
        <>
            <div className="modal__header">
                {children}
            </div>
        </>
    );
}
