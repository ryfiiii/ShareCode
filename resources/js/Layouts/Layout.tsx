interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    return (
        <div>
            <header>Header</header>
            <main>
                {children}
            </main>
            <footer>Footer</footer>
        </div>
    );
};

export default Layout;
