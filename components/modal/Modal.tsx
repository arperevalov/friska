interface ModalElementProps {
    show: boolean;
    children: React.ReactNode;
    onHide: CallableFunction;
}

export default function Modal(props: ModalElementProps) {
    const { show, children, onHide } = props;

    const onHideEvent = () => {
        onHide();
    };

    return (
        <>
            {show ? (
                <>
                    <div className={`modal show`}>
                        <div className="modal__content">{children}</div>
                        <div className="modal__backdrop" onClick={onHideEvent}></div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
