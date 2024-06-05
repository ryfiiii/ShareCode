interface ModalProps {
    modalRef: React.RefObject<HTMLDialogElement>;
    color?: string;
    message: string;
}

const Modal = ({ modalRef, color, message }: ModalProps) => {

    return (
        <>
            <dialog ref={modalRef} className="modal">
                {color === 'success' && (
                    <div className={`modal-box border-4 border-success`}>
                        <p className="py-3 text-center text-lg">{message}</p>
                    </div>
                )}
                {color === 'info' && (
                    <div className={`modal-box border-4 border-info`}>
                        <p className="py-3 text-center text-lg">{message}</p>
                    </div>
                )}
                {color === 'error' && (
                    <div className={`modal-box border-4 border-error`}>
                        <p className="py-3 text-center text-lg">{message}</p>
                    </div>
                )}
                {color === 'warning' && (
                    <div className={`modal-box border-4 border-warning`}>
                        <p className="py-3 text-center text-lg">{message}</p>
                    </div>
                )}
                <form method="dialog" className="modal-backdrop">
                    <button></button>
                </form>
            </dialog>
        </>
    );
};

export default Modal;
