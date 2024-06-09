import Layout from "@/Layouts/Layout";
import { Post } from "@/types";
import { InertiaPageProps } from "@/types/Inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PostGetResponse } from "@/types/ApiResponse";
import { languages } from "@/util/languages";
import dayjs from "dayjs";
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

const Home = () => {

    const { props } = usePage<InertiaPageProps>();
    console.log(props);

    const [posts, setPosts] = useState(props.posts?.items || []);
    const [nextPageUrl, setNextPageUrl] = useState(props.posts?.next_page_url);
    const [loading, setLoading] = useState(false);

    const observer = useRef<IntersectionObserver>();
    const lastElementRef = useRef<HTMLDivElement>(null);

    const fetchMorePosts = async () => {
        if (!nextPageUrl || loading) return;

        setLoading(true);
        try {
            const response = await axios.get<PostGetResponse>(nextPageUrl);
            setPosts((prevPosts) => [...prevPosts, ...response.data.posts.items]);
            setNextPageUrl(response.data.posts.next_page_url);
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextPageUrl) {
                fetchMorePosts();
            }
        }, options);

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => {
            if (observer.current && lastElementRef.current) {
                observer.current.unobserve(lastElementRef.current);
            }
        };
    }, [nextPageUrl, loading]);

    // クリック時に遷移
    const handleClick = (slug: string) => {
        // テキスト選択時は遷移しない
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            return;
        }

        Inertia.visit(route('view', { slug: slug }));
    }

    // div内のLinkをクリックした時は、ユーザーページに遷移
    const handleUserLinkClick = (e: React.MouseEvent<HTMLParagraphElement>, user_id: string) => {
        e.stopPropagation();
        Inertia.visit(route('user', { user: user_id }));
    }

    return (
        <>
            <Head title="ホーム" />
            <Layout>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
                    {posts?.map((post: Post) => {
                        return (
                            <div onClick={() => handleClick(post.slug)} key={post.slug} className="cursor-pointer bg-base-100 hover:bg-base-300 hover:translate-y-1 transition duration-300 w-full min-h-32 rounded-box shadow-lg hover:shadow-sm p-6 flex flex-col gap-3">
                                <h1 className="text-center text-2xl font-semibold line-clamp-2 lg:line-clamp-1 break-words">{post.title}</h1>
                                <div className="flex-1">
                                    <p className="line-clamp-2 break-words h-12">{post.comment}</p>
                                </div>
                                <div className="flex-1 relative">
                                    <Highlight className={`${post.language} w-full rounded-lg h-44  overflow-hidden`}>
                                        {post.code}
                                    </Highlight>
                                    <div className="absolute top-1 right-1">
                                        <span className="text-xs font-semibold bg-base-300 py-1 px-2 rounded-md">{languages[post.language]}</span>
                                    </div>
                                </div>
                                <div className="flex-1 mt-3 flex gap-5">
                                    <div>
                                        <FontAwesomeIcon className="mr-1" icon={faComment} />10
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className="mr-1" icon={faHeart} />{post.likes}
                                    </div>
                                </div>
                                <div className="flex-1 mt-1">
                                    <div className="flex items-end">
                                        <div className="flex-1 flex gap-2 items-center" onClick={(e) => handleUserLinkClick(e, post.user.user_id)}>
                                            <div className="avatar">
                                                <div className="w-12 rounded-full border-2 border-base-300 hover:scale-110 transform duration-200">
                                                    <img src={post.user.avatar} alt="icon" />
                                                </div>
                                            </div>
                                            <p className="text-base hover:underline">{post.user.name}</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs lg:text-sm text-right">{dayjs(post.published_at).format('YYYY-MM-DD HH:mm')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div >

                {/* ローディングアニメーション */}
                {
                    loading && (
                        <div className="flex justify-center mt-16" aria-label="読み込み中">
                            <div className="animate-spin h-10 w-10 border-4 border-sky-400 rounded-full border-t-transparent"></div>
                        </div>
                    )
                }

                {/* ダミー要素 */}
                <div ref={lastElementRef} className="w-full h-20"></div>
            </Layout >
        </>
    );
};

export default Home;
