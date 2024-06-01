import Layout from "@/Layouts/Layout";
import { InertiaPageProps } from "@/types/Inertia";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";

const Setting = () => {

    const { props } = usePage<InertiaPageProps>();

    const [name, setName] = useState(props.auth.user?.name);
    const [email, setEmail] = useState(props.auth.user?.email);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    return (
        <>
            <Head title="設定" />
            <Layout>
                <div className="w-full md:w-4/5 lg:w-2/3 mx-auto bg-base-100 rounded-2xl shadow-lg p-5 md:p-8 lg:p-10">
                    <div className="mb-10">
                        <h1 className="font-bold text-xl">アカウント設定</h1>
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1 text-sm">ユーザー名</label>
                            <input type="text" id="name" className="input input-bordered" value={name} onChange={handleNameChange} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-sm">メールアドレス</label>
                            <input type="text" id="email" className="input input-bordered" disabled value={email} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="avatar" className="mb-3 text-sm">アイコン</label>
                            <div className="flex justify-center items-center gap-6 md:gap-7 lg:gap-10 flex-col md:flex-row">
                                <div className="avatar">
                                    <div className="w-20 lg:w-24 rounded-full">
                                        <img src={props.auth.user?.avatar} alt="icon" />
                                    </div>
                                </div>
                                <input type="file" id="avatar" className="file-input file-input-bordered file-input-sm md:file-input-md w-full" />
                            </div>
                        </div>
                        <div className="flex flex-col mt-7">
                            <button className="btn btn-neutral w-full md:w-1/3 lg:w-1/4 mx-auto" disabled>
                                <span className="loading loading-spinner mr-2" />
                                保存する
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Setting;