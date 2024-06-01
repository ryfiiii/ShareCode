import Layout from "@/Layouts/Layout";
import { InertiaPageProps } from "@/types/Inertia";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Setting = () => {

    const { props } = usePage<InertiaPageProps>();

    const [name, setName] = useState(props.auth.user?.name);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    return (
        <>
            <Head title="設定" />
            <Layout>
                <div className="w-full md:w-4/5 lg:w-2/3 mx-auto bg-base-100 rounded-2xl shadow-lg p-5 md:p-8 lg:p-10">
                    <div className="mb-10">
                        <h1 className="font-bold text-xl">アカウント設定</h1>
                    </div>
                    <form method="POST" action={route('setting.update')} encType="multipart/form-data" className="flex flex-col gap-7 md:gap-10">
                        <div className="flex flex-col">
                            <label htmlFor="avatar" className="mb-3 text-sm">アイコン</label>
                            <div className="flex justify-center items-center gap-6 md:gap-7 lg:gap-10 flex-col md:flex-row">
                                <div className="avatar">
                                    <div className="w-20 lg:w-24 rounded-full border-2 border-base-300">
                                        <img src={props.auth.user?.avatar} alt="icon" />
                                    </div>
                                </div>
                                <input type="file" id="avatar" name="avatar" accept="image/jpeg, image/png" className="file-input file-input-bordered file-input-sm md:file-input-md w-full" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1 text-sm">ユーザー名</label>
                            <input type="text" id="name" name="name" className="input input-bordered" value={name} onChange={handleNameChange} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-sm">メールアドレス</label>
                            <input type="text" id="email" className="input input-bordered" disabled value={props.auth.user?.email} />
                        </div>
                        <div className="flex flex-col mt-7">
                            <input type="hidden" name="_token" value={props.csrf_token} />
                            <button type="submit" className="btn btn-neutral w-full md:w-1/3 lg:w-1/4 mx-auto">保存する</button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default Setting;
