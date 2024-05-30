import { Link, usePage } from "@inertiajs/react";
import ToggleTheme from "../ui/ToggleTheme";

const Header = () => {

    const { activeTab } = usePage().props;

    return (
        <div className="flex bg-base-100 shadow-lg flex-col">
            <div className="flex items-center justify-between py-2 w-full">
                <div>
                    <Link href="/" className="btn btn-ghost text-lg">ShareCode</Link>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
            <div className="md:w-1/2 md:mx-auto">
                <div role="tablist" className="tabs tabs-bordered">
                    <Link href="/" role="tab" className={`tab ${activeTab === 'home' ? 'tab-active' : ''} md:text-lg`}>HOME</Link>
                    <Link href="/post" role="tab" className={`tab ${activeTab === 'post' ? 'tab-active' : ''} md:text-lg`}>POST</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
