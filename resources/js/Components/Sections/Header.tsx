import { Link, usePage } from "@inertiajs/react";
import ToggleTheme from "../ui/ToggleTheme";
import { InertiaPageProps } from "@/types/Inertia";
import { useRef } from "react";
import LoginModal from "../ui/LoginModal";

const Header = () => {

    const { props } = usePage<InertiaPageProps>();

    const loginModal = useRef<HTMLDialogElement>(null);

    return (
        <>
            <LoginModal modalRef={loginModal} />
            <div className="flex items-center justify-between py-2 w-full bg-base-100 shadow-md">
                <div className="ml-3">
                    <Link href={route('home')} className="btn btn-ghost text-lg md:text-2xl font-light">{import.meta.env.VITE_APP_NAME}</Link>
                </div>
                <div className="flex justify-center items-center">
                    <ToggleTheme />
                    <div className="mx-3 dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar bg-base-300">
                            <div className="w-12 rounded-full">
                                {props.auth?.user ? (
                                    <img src={props.auth.user.avatar} alt="icon" />
                                ) : (
                                    <svg className="text-gray-400 m-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                )}
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            {props.auth?.user ? (
                                <>
                                    <li className="my-1"><Link href={route('mypage')}>マイページ</Link></li>
                                    <li className="my-1"><Link href={route('setting')}>設定</Link></li>
                                    <li className="my-1"><Link href={route('logout')}>ログアウト</Link></li> {/* todo あとでアイコン追加 */}
                                </>
                            ) : (
                                <li><label onClick={() => loginModal.current?.showModal()}>ログイン</label></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="btm-nav lg:hidden">
                <Link href={route('home')} as="button" type="button" className={route().current('home') ? 'active' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="btm-nav-label">ホーム</span>
                </Link>
                <Link href={route('mypage')} as="button" type="button" className={route().current('mypage') ? 'active' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    <span className="btm-nav-label">マイページ</span>
                </Link>
            </div>
        </>
    );
};

export default Header;
