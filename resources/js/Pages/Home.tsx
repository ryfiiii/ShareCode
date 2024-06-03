import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <Layout>
                <div className="w-full lg:w-4/5 mx-auto mockup-window border border-base-300 bg-base-100 shadow-md">
                    <div className="flex justify-center px-4 py-16 border-t border-base-300">Hello!</div>
                </div>
            </Layout>
        </>
    );
};

export default Home;
