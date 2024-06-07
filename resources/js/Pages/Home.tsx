import Layout from "@/Layouts/Layout";
import { Post } from "@/types";
import { InertiaPageProps } from "@/types/Inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PostGetResponse } from "@/types/ApiResponse";

const Home = () => {

    const { props } = usePage<InertiaPageProps>();

    const [posts, setPosts] = useState(props.posts?.items || []);
    const [nextPageUrl, setNextPageUrl] = useState(props.posts?.next_page_url);
    const [loading, setLoading] = useState(false);

    const observer = useRef<IntersectionObserver>();
    const lastElementRef = useRef<HTMLDivElement>(null);

    const fetchMorePosts = async () => {
        if (!nextPageUrl) {
            return;
        }
        setLoading(true);
        const response = await axios.get<PostGetResponse>(nextPageUrl);
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts.items]);
        setNextPageUrl(response.data.posts.next_page_url);
        setLoading(false);
    }

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
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
    }, [nextPageUrl]);

    return (
        <>
            <Head title="Home" />
            <Layout>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
                    {posts?.map((post: Post) => {
                        return (
                            <div key={post.id} className="bg-base-100 w-full min-h-32 rounded-box shadow-md p-6 flex flex-col gap-3">
                                <h1 className="text-center text-2xl font-semibold line-clamp-2 lg:line-clamp-1 break-words">{post.title}</h1>
                                <div className="flex-1">
                                    <p className="line-clamp-4 lg:line-clamp-3 break-words">{post.comment}</p>
                                </div>
                                <Highlight className={`${post.language} w-full rounded-lg h-44 flex-1 overflow-hidden`}>
                                    {post.code}
                                </Highlight>
                                <a href={`/view/${post.slug}`} className="btn font-light w-full">続きを見る</a>
                            </div>
                        );
                    })}
                </div>

                {/* ローディングアニメーション */}
                {loading && (
                    <div className="flex justify-center mt-16" aria-label="読み込み中">
                        <div className="animate-spin h-10 w-10 border-4 border-sky-400 rounded-full border-t-transparent"></div>
                    </div>
                )}

                {/* ダミー要素 */}
                <div ref={lastElementRef} className="w-full h-20"></div>
            </Layout>
        </>
    );
};

export default Home;
