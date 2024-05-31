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
            <div className="toast toast-center">
                <div className="alert alert-success shadow-lg" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-bold">Message sent successfully.</span>
                </div>
            </div>
        </>
    );
};

export default Home;
