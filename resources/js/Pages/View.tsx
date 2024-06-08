import Layout from "@/Layouts/Layout";
import { InertiaPageProps } from "@/types/Inertia";
import { usePage } from "@inertiajs/react";
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark-reasonable.css';

const View = () => {

    const { props } = usePage<InertiaPageProps>();
    console.log(props);

    return (
        <>
            <Layout>
                <div className="w-full lg:w-3/4 mx-auto bg-base-100 shadow-md rounded-box py-10 px-4 md:px-12 lg:px-24 flex flex-col min-h-96 gap-12">
                    <h1 className="text-3xl font-bold text-center break-words">{props.post?.title}</h1>
                    <div className="flex-1">
                        <p className="break-words whitespace-pre-line">{props.post?.comment}</p>
                    </div>
                    <Highlight className={`${props.post?.language} overflow-hidden flex-1 w-full rounded-lg min-h-44 `}>
                        {props.post?.code}
                    </Highlight>
                </div>
            </Layout>
        </>
    );
};

export default View;
