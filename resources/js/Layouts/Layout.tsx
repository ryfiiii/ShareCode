import Footer from "@/Components/Sections/Footer";
import Header from "@/Components/Sections/Header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <div className="min-h-screen bg-base-200">
                <Header />
                <main className="mx-auto w-full px-6 xs:px-7 sm:px-10 max-w-screen-xl flex flex-col mt-5">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
