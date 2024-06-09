import Layout from "@/Layouts/Layout";
import { InertiaPageProps } from "@/types/Inertia";
import { Head, usePage } from "@inertiajs/react";

const User = () => {

    const { props } = usePage<InertiaPageProps>();
    return (
        <>
            <Head title="ユーザー" />
            <Layout>
                ユーザー
            </Layout>
        </>
    );
};

export default User;
