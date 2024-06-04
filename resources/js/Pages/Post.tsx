import Layout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import { languages } from "@/util/languages";
import { InertiaPageProps } from "@/types/Inertia";
import { publish_status } from "@/util/publish_status";

const Post = () => {

    const { props } = usePage<InertiaPageProps>();

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState(props.auth.user?.favorite_language);
    const [publishStatus, setPublishStatus] = useState(0);

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
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    }
    const handlePublishStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPublishStatus(parseInt(e.target.value));
    }

    return (
        <>
            <Head title="新規投稿" />
            <Layout>
                <div className="w-full bg-base-100 shadow-md rounded-box p-5 flex flex-col min-h-96 gap-12">
                    <div className="flex w-full flex-col md:flex-row">
                        <div className="w-full md:w-1/2 md:pr-5">
                            <div className="mb-6">
                                <p className="ml-3 mb-2">タイトル<span className="text-red-500 ml-1 font-bold">*</span></p>
                                <input type="text" onChange={handleTitleChange} className="input input-bordered w-full" placeholder="タイトルを入力..." />
                            </div>
                            <div className="mb-6">
                                <p className="ml-3 mb-2">コメント</p>
                                <textarea onChange={handleCommentChange} className="textarea textarea-bordered w-full min-h-32 resize-none overflow-y-auto" placeholder="コメントを入力..."></textarea>
                            </div>
                            <div className="mb-6">
                                <p className="ml-3 mb-2">コード<span className="text-red-500 ml-1 font-bold">*</span></p>
                                <textarea spellCheck="false" onChange={handleCodeChange} className="textarea textarea-bordered w-full min-h-40 resize-none" onKeyDown={onKeyDownTab} style={{ tabSize: 4 }} placeholder="コードを入力..."></textarea>
                            </div>
                            <div className="mb-6 flex gap-12 items-center">
                                <div className="w-full">
                                    <p className="ml-3 mb-2">言語<span className="text-red-500 ml-1 font-bold">*</span></p>
                                    <select onChange={handleLanguageChange} className="select select-bordered w-full" value={language}>
                                        {Object.entries(languages).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <p className="ml-3 mb-2">公開設定<span className="text-red-500 ml-1 font-bold">*</span></p>
                                    <select onChange={handlePublishStatusChange} className="select select-bordered w-full" value={publishStatus}>
                                        {Object.entries(publish_status).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <span className="hidden md:block border-l-2 border-base-300 min-h-96" />
                        <span className="block md:hidden border-b-2 border-base-300 min-h-1 my-5" />

                        <div className="w-full md:w-1/2 md:pl-5">
                            <div className="mb-6">
                                <p className="ml-3 mb-2">　</p>
                                <input type="text" className="input input-bordered w-full disabled:text-gray-600 disabled:cursor-text" disabled value={title} />
                            </div>
                            <div className="mb-6">
                                <p className="ml-3 mb-2">　</p>
                                <textarea className="textarea textarea-bordered w-full min-h-32 resize-none disabled:text-gray-600 disabled:cursor-text" disabled value={comment}></textarea>
                            </div>
                            <div>
                                <p className="ml-3 mb-2">　</p>
                                <Highlight className={`${language} w-full rounded-box min-h-40`}>
                                    {code}
                                </Highlight>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center item-center gap-16">
                        <button className="btn">下書き保存</button>
                        <button className="btn btn-neutral">投稿する</button>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Post;
