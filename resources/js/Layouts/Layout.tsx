import Footer from "@/Components/Sections/Footer";
import Header from "@/Components/Sections/Header";
import Toast from "@/Components/ui/Toast";
import { AlertColor } from "@/types";
import { InertiaPageProps } from "@/types/Inertia";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    const { props } = usePage<InertiaPageProps>();
    const [isVisible, setIsVisible] = useState(false);

    console.log(props);

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
                <main className="mx-auto w-full px-6 xs:px-7 sm:px-10 max-w-screen-xl flex flex-col mt-5">
                    {children}
                </main>
            </div>
            <Footer />

            {/* フラッシュメッセージ表示用 */}
            {isVisible && props.flash.color && props.flash.message && (
                <Toast color={props.flash.color} message={props.flash.message} />
            )}
        </>
    );
};

export default Layout;
