import Toast from "@/Components/ui/Toast";
import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <Layout>
                <div className="mockup-window border border-base-300 bg-base-100 shadow-md">
                    <div className="flex justify-center px-4 py-16 border-t border-base-300">Hello!</div>
                </div>

            </Layout>

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <p className="py-4">
                        <a href="/auth/google">Google Login</a>
                    </p>
                    <p className="py-4">
                        <a href="/auth/github">Github Login</a>
                    </p>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </>
    );
};

export default Home;
