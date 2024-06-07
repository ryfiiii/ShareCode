import Layout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import { languages } from "@/util/languages";
import { InertiaPageProps } from "@/types/Inertia";
import { publish_status } from "@/util/publish_status";
import axios from "axios";
import Modal from "@/Components/ui/Modal";
import { PostResponse } from "@/types/ApiResponse";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import PostModal from "@/Components/ui/PostModal";

const Post = () => {

    const { props } = usePage<InertiaPageProps>();
    const isAuth = props.auth.user ? true : false;

    // モーダル関係
    const noAuthModal = useRef<HTMLDialogElement>(null);
    const PostErrorResponseModal = useRef<HTMLDialogElement>(null);
    const PostResponseModal = useRef<HTMLDialogElement>(null);

    const [modalMessage, setModalMessage] = useState<string>('');
    const [modalPostUrl, setModalPostUrl] = useState<string>('');
    const [errorModalMessage, setErrorModalMessage] = useState<string>('');
    const [errorModalColor, setErrorModalColor] = useState<string>('');

    // ログインしていない時はモーダルを表示
    useEffect(() => {
        if (!isAuth) {
            noAuthModal.current?.showModal();
        }
    }, [isAuth]);

    // フォーム
    const defaultValues = {
        title: "",
        comment: "",
        code: "",
        language: props.auth.user?.favorite_language,
        publish_status: "0",
    }

    // バリデーション
    const schema = z.object({
        title: z.string().min(1, 'タイトルは必須です').max(50, 'タイトルは50文字以内で入力してください'),
        comment: z.string().max(500, 'コメントは500文字以内で入力してください'),
        code: z.string().min(1, 'コードは必須です').max(1000, 'コードは1000文字以内で入力してください'),
        language: z.string().min(1, '言語は必須です'),
        publish_status: z.string().min(1, '公開設定は必須です'),
    });

    const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
        mode: 'onChange',
    });

    const title = watch('title');
    const comment = watch('comment');
    const code = watch('code');
    const language = watch('language');
    const publishStatus = watch('publish_status');

    // 投稿処理
    const onSubmit = async () => {
        try {
            const res = await axios.post<PostResponse>(route('post.post'), {
                title: title,
                comment: comment,
                code: code,
                language: language,
                publish_status: parseInt(publishStatus, 10),
            });
            setModalMessage(res.data.message);
            setModalPostUrl(`${import.meta.env.VITE_APP_URL}/view/${res.data?.url}`);
            PostResponseModal.current?.showModal();

        } catch (error: any) {
            console.error(error.response.data)
            setErrorModalMessage(error.response.data.message);
            setErrorModalColor(error.response.data.color);
            PostErrorResponseModal.current?.showModal();
        }
    }

    const submitDraft = async () => {
        try {
            const res = await axios.post(route('post'), {
                title: title,
                comment: comment,
                code: code,
                language: language,
                publish_status: publishStatus
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onKeyDownTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Tab') return;
        // todo タブ入力時にインデントを増やす処理を追加
        e.preventDefault();
    }

    return (
        <>
            <Head title="新規投稿" />

            <Modal modalRef={noAuthModal} color={"error"} message={"新規投稿をするにはログインが必要です"} />
            <Modal modalRef={PostErrorResponseModal} color={errorModalColor} message={errorModalMessage} />
            <PostModal modalRef={PostResponseModal} message={modalMessage} url={modalPostUrl} />

            <Layout>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-base-100 shadow-md rounded-box p-5 flex flex-col min-h-96 gap-12">
                    <div className="flex w-full flex-col md:flex-row">
                        <div className="w-full md:w-1/2 md:pr-5">
                            <div className="mb-6">
                                <p className="ml-3 mb-2">タイトル<span className="text-red-500 ml-1 font-bold">*</span></p>
                                <input type="text" {...register('title')} onBlur={() => trigger('title')} disabled={!isAuth} className={`input input-bordered w-full ${errors.title && 'input-error'}`} placeholder="50文字以内で入力..." />
                                {errors.title && <span className="text-sm text-error">※{errors.title.message as string}</span>}
                            </div>
                            <div className="mb-6">
                                <p className="ml-3 mb-2">コメント</p>
                                <textarea {...register('comment')} onBlur={() => trigger('comment')} disabled={!isAuth} className={`textarea textarea-bordered w-full min-h-32 resize-none overflow-y-auto ${errors.comment && 'textarea-error'}`} placeholder="500文字以内で入力..."></textarea>
                                {errors.comment && <span className="text-sm text-error">※{errors.comment.message as string}</span>}
                            </div>
                            <div className="mb-6">
                                <p className="ml-3 mb-2">コード<span className="text-red-500 ml-1 font-bold">*</span></p>
                                <textarea onKeyDown={onKeyDownTab} {...register('code')} onBlur={() => trigger('code')} spellCheck="false" disabled={!isAuth} className={`textarea textarea-bordered w-full min-h-40 resize-none ${errors.code && 'textarea-error'}`} style={{ tabSize: 4 }} placeholder="1000文字以内で入力..."></textarea>
                                {errors.code && <span className="text-sm text-error">※{errors.code.message as string}</span>}
                            </div>
                            <div className="mb-6 flex gap-12 items-center">
                                <div className="w-full">
                                    <p className="ml-3 mb-2">言語</p>
                                    <select {...register('language')} onBlur={() => trigger('language')} disabled={!isAuth} className="select select-bordered w-full">
                                        {Object.entries(languages).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </select>
                                    {errors.language && <span className="text-sm text-error">※{errors.language.message as string}</span>}
                                </div>
                                <div className="w-full">
                                    <p className="ml-3 mb-2">公開設定</p>
                                    <select {...register('publish_status')} onBlur={() => trigger('publish_status')} disabled={!isAuth} className="select select-bordered w-full">
                                        {Object.entries(publish_status).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </select>
                                    {errors.publish_status && <span className="text-sm text-error">※{errors.publish_status.message as string}</span>}
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
                        <button onClick={submitDraft} disabled={!isAuth} className="btn">下書き保存</button>
                        <button type="submit" disabled={!isAuth} className="btn btn-neutral">投稿する</button>
                    </div>
                </form>
            </Layout>
        </>
    );
};
export default Post;
