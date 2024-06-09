import Layout from "@/Layouts/Layout";
import { InertiaPageProps } from "@/types/Inertia";
import { Head, usePage } from "@inertiajs/react";
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { languages } from "@/util/languages";

const View = () => {

    const { props } = usePage<InertiaPageProps>();
    const post = props.post;
    console.log(post);

    return (
        <>
            <Head title={post?.title}>
                <meta head-key="description" name="description" content={post?.comment} />
            </Head>
            <Layout>
                <div className="w-full lg:w-3/4 mx-auto bg-base-100 shadow-md rounded-box py-10 px-4 md:px-12 lg:px-24 flex flex-col min-h-96 gap-12">
                    <h1 className="text-3xl font-bold text-center break-words">{post?.title}</h1>
                    <div className="flex-1 mt-1">
                        <div className="flex justify-center md:justify-between items-center md:items-end flex-col md:flex-row">
                            <div className="flex gap-2 items-center mb-5 md:mb-0">
                                <div className="avatar">
                                    <div className="w-12 rounded-full border-2 border-base-300">
                                        <img src={post?.user.avatar} alt="icon" />
                                    </div>
                                </div>
                                <p className="text-lg hover:underline"><a href="#">{post?.user.name}</a></p>
                            </div>
                            <div className="flex justify-center items-center flex-col gap-2">
                                <div className="flex gap-5">
                                    <div className="text-lg text-sky-500 cursor-pointer">
                                        <FontAwesomeIcon className="mr-1" icon={faComment} />10
                                    </div>
                                    <div className="text-lg text-pink-400 cursor-pointer">
                                        <FontAwesomeIcon className="mr-1" icon={faHeart} />{post?.likes}
                                    </div>
                                </div>
                                <p className="text-xs lg:text-sm text-right">公開日: {dayjs(post?.published_at).format('YYYY-MM-DD HH:mm')}</p>
                                <p className="text-xs lg:text-sm text-right">更新日: {dayjs(post?.updated_at).format('YYYY-MM-DD HH:mm')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="break-words whitespace-pre-line">{post?.comment}</p>
                    </div>
                    <div className="flex-1  relative">
                        <Highlight className={`${post?.language} overflow-hidden flex-1 w-full rounded-lg min-h-44 `}>
                            {post?.code}
                        </Highlight>
                        <div className="absolute top-2 right-1">
                            <span className="font-semibold bg-base-300 py-1 px-2 rounded-md">{languages[post?.language as string]}</span>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default View;
