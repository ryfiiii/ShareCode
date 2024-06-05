interface ModalProps {
    modalRef: React.RefObject<HTMLDialogElement>;
    message: string;
    url: string;
}

const PostModal = ({ modalRef, message, url }: ModalProps) => {

    return (
        <>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box border-4 border-success">
                    <div className="flex flex-col justify-center items-center">
                        <p className="py-3 text-center text-lg">{message}</p>
                        <a href={`http://127.0.0.1:8000/view/${url}`}>{`http://127.0.0.1:8000/view/${url}`}</a>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button></button>
                </form>
            </dialog>
        </>
    );
};

export default PostModal;
