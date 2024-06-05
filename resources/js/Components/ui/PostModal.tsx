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
                        <input type="text" className="input w-full disabled:cursor-pointer" disabled value={url} />
                        <a href={url} className="underline mt-5">投稿を見る</a>
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
