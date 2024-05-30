import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <Layout>
                <h1 className="text-neutral-content">あいうえお</h1>
                <button className="btn btn-neutral">Neutral</button>
            </Layout>
        </>
    );
};

export default Home;
