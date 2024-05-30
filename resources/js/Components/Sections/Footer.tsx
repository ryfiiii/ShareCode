import React from "react";

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 text-base-content bg-base-300 rounded">
            <nav className="grid grid-flow-col gap-4">
                <a className="link link-hover">利用規約</a>
                <a className="link link-hover">プライバシーポリシー</a>
            </nav>
            <aside>
                <p>Copyright © 2024 - All right reserved by ShareCode</p>
            </aside>
        </footer>
    );
};

export default Footer;
