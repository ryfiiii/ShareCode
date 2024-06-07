import Layout from "@/Layouts/Layout";
import { InertiaPageProps } from "@/types/Inertia";
import { usePage } from "@inertiajs/react";
import React from "react";

const View = () => {

    const { props } = usePage<InertiaPageProps>();
    console.log(props);

    return (
        <>
            <Layout>
                <h1>View</h1>
            </Layout>
        </>
    );
};

export default View;
