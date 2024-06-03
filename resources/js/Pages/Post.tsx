import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark-reasonable.css';

const Post = () => {

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [code, setCode] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    }

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
    }

    const onKeyDownTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Tab') return;
        e.preventDefault();
    }

    return (
        <>
            <Head title="新規投稿" />
            <Layout>
                <div className="w-full bg-base-100 shadow-md rounded-box p-5 flex min-h-96">
                    <div className="w-1/2 pr-5">
                        <div className="mb-10">
                            <p className="ml-3 mb-2">タイトル</p>
                            <input type="text" onChange={handleTitleChange} className="input input-bordered w-full" placeholder="タイトルを入力..." />
                        </div>
                        <div className="mb-10">
                            <p className="ml-3 mb-2">コメント</p>
                            <textarea onChange={handleCommentChange} className="textarea textarea-bordered w-full min-h-40 resize-none" placeholder="コメントを入力..."></textarea>
                        </div>
                        <div>
                            <p className="ml-3 mb-2">コード</p>
                            <textarea onChange={handleCodeChange} className="textarea textarea-bordered w-full min-h-40 resize-none" onKeyDown={onKeyDownTab} style={{ tabSize: 4 }} placeholder="コードを入力..."></textarea>
                        </div>
                    </div>

                    <span className="border-l-2 border-base-300 min-h-96" />

                    <div className="w-1/2 pl-5">
                        <div className="mb-10">
                            <p className="ml-3 mb-2">　</p>
                            <input type="text" className="input input-bordered w-full disabled:text-gray-600 disabled:cursor-text" disabled value={title} />
                        </div>
                        <div className="mb-10">
                            <p className="ml-3 mb-2">　</p>
                            <textarea className="textarea textarea-bordered w-full min-h-40 resize-none disabled:text-gray-600 disabled:cursor-text" disabled value={comment}></textarea>
                        </div>
                        <div>
                            <p className="ml-3 mb-2">　</p>
                            <Highlight className="typescript w-full rounded-box min-h-40">
                                {code}
                            </Highlight>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Post;
