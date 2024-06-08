import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

interface ModalProps {
    modalRef: React.RefObject<HTMLDialogElement>;
    message: string;
    url: string;
}

const PostModal = ({ modalRef, message, url }: ModalProps) => {

    const handleButtonClick = () => {
        Inertia.visit(route('view', { slug: url }));
    };

    return (
        <>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box border-4 border-success">
                    <div className="flex flex-col justify-center items-center">
                        <p className="py-3 text-center text-lg">{message}</p>
                        <input type="text" className="input w-full disabled:cursor-pointer" disabled value={`${import.meta.env.VITE_APP_URL}/view/${url}`} />
                        <Link href={route('view', { slug: url })} className="underline mt-5">投稿を見る</Link>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleButtonClick}></button>
                </form>
            </dialog>
        </>
    );
};

export default PostModal;
