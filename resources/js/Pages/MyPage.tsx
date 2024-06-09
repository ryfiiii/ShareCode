import Layout from "@/Layouts/Layout";
import { InertiaPageProps } from "@/types/Inertia";
import { Head, usePage } from "@inertiajs/react";

const Draft = () => {

    const { props } = usePage<InertiaPageProps>();
    return (
        <>
            <Head title="下書き" />
            <Layout>
                下書き
            </Layout>
        </>
    );
};

export default Draft;
