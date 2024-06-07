import Footer from "@/Components/Sections/Footer";
import Header from "@/Components/Sections/Header";
import PostMenu from "@/Components/ui/PostMenu";
import Toast from "@/Components/ui/Toast";
import { InertiaPageProps } from "@/types/Inertia";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    const { props } = usePage<InertiaPageProps>();
    const [isVisible, setIsVisible] = useState(false);

    // console.log(props);

    useEffect(() => {
        if (props.flash?.message) {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 4000);
        }
    }, [props.flash]);

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <Header />
                <main className="mx-auto w-full px-6 xs:px-7 sm:px-10 max-w-screen-2xl flex flex-col py-5 md:py-7 lg:py-10">
                    {children}
                </main>
            </div>
            <Footer />

            {/* 投稿メニューボタン */}
            <PostMenu />

            {/* フラッシュメッセージ表示用 */}
            {isVisible && props.flash.color && props.flash.message && (
                <Toast color={props.flash.color} message={props.flash.message} />
            )}
        </>
    );
};

export default Layout;
