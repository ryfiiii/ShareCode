import Modal from "@/Components/ui/Modal";
import Layout from "@/Layouts/Layout";
import { SettingResponse } from "@/types/ApiResponse";
import { InertiaPageProps } from "@/types/Inertia";
import { languages } from "@/util/languages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Setting = () => {

    const { props } = usePage<InertiaPageProps>();
    const [uploadAvatar, setUploadAvatar] = useState<FileList | null>(null);
    const [avatar, setAvatar] = useState(props.auth.user?.avatar);

    // モーダル関係
    const AlertModal = useRef<HTMLDialogElement>(null);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [modalColor, setModalColor] = useState<string>('');

    // フォーム
    const defaultValues = {
        avatar: props.auth.user?.avatar,
        name: props.auth.user?.name,
        language: props.auth.user?.favorite_language,
    }

    // バリデーション
    const schema = z.object({
        name: z.string().min(1, 'ユーザー名は必須です').max(25, 'ユーザー名は25文字以内で入力してください'),
        language: z.string().min(1, '言語は必須です'),
    });

    const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
        mode: 'onChange',
    });

    const name = watch('name');
    const language = watch('language');

    // フォームデータ作成
    const formData = new FormData();
    (uploadAvatar && uploadAvatar[0]) && formData.append('avatar', uploadAvatar[0]);
    formData.append('name', name ?? '');
    formData.append('favorite_language', language ?? '');

    // フォーム送信処理
    const onSubmit = async () => {
        try {
            const res = await axios.post<SettingResponse>(route('setting.update'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            setModalMessage(res.data.message);
            setModalColor(res.data.color);
            res.data.avatar && setAvatar(res.data.avatar);

        } catch (error: any) {
            setModalMessage(error.response.data.message);
            setModalColor(error.response.data.color);
        } finally {
            AlertModal.current?.showModal();
        }
    }

    // 画像アップロード処理
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadAvatar(event.target.files);
    }

    return (
        <>
            <Head title="設定" />
            <Modal modalRef={AlertModal} color={modalColor} message={modalMessage} />

            <Layout>
                <div className="w-full md:w-4/5 lg:w-2/3 mx-auto bg-base-100 rounded-2xl shadow-lg p-5 md:p-8 lg:p-10">
                    <div className="mb-10">
                        <h1 className="font-bold text-xl">アカウント設定</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 md:gap-10">
                        <div className="flex flex-col">
                            <label htmlFor="avatar" className="mb-3 text-sm">アイコン</label>
                            <div className="flex justify-center items-center gap-6 md:gap-7 lg:gap-10 flex-col md:flex-row">
                                <div className="avatar">
                                    <div className="w-20 lg:w-24 rounded-full border-2 border-base-300">
                                        <img src={avatar} alt="icon" />
                                    </div>
                                </div>
                                <input type="file" onChange={handleFileUpload} id="avatar" accept="image/jpeg, image/png" className={`file-input file-input-bordered file-input-sm md:file-input-md w-full`} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1 text-sm">ユーザー名</label>
                            <input type="text" {...register('name')} onBlur={() => trigger('name')} id="name" className={`input input-bordered ${errors.name && `input-error`}`} value={name} />
                            {errors.name && <span className="text-sm text-error">※{errors.name.message as string}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-sm">メールアドレス</label>
                            <input type="text" id="email" className="input input-bordered" disabled value={props.auth.user?.email} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lang" className="mb-1 text-sm">お気に入りの言語</label>
                            <select {...register('language')} onBlur={() => trigger('language')} id="lang" className="select select-bordered" value={language}>
                                {Object.entries(languages).map(([key, value]) => (
                                    <option key={key} value={key}>{value}</option>
                                ))}
                            </select>
                            {errors.language && <span className="text-sm text-error">※{errors.language.message as string}</span>}
                        </div>
                        <div className="flex flex-col mt-7">
                            <button type="submit" className="btn btn-neutral w-full md:w-1/3 lg:w-1/4 mx-auto">保存する</button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default Setting;
