import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../models/user";
import authService from "../../services/authService";
import utilService from '../../services/utilService'
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
interface IMenu {
    title: string,
    path: string,
    check?: boolean
}


export default function Navbar(props: any) {
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [user, setUser] = useState<IUser | undefined>()
    const handleOpenMobileMenu = () => {
        const mobileMenu = document.getElementById("mobile-menu");
        mobileMenu?.classList.toggle('hidden')
    }
    const listMenu: IMenu[] = [
        {
            title: 'Players',
            path: '/player'
        },
        {
            title: 'Nations',
            path: '/nation'
        },
        {
            title: 'User',
            path: '/user',
            check: true
        }

    ]
    useEffect(() => {
        setUserInfo()
    }, [])
    const setUserInfo = () => {
        authService.info().then(res => {
            setUser(res.results.object)
            props.handleSetUser(res.results.object)
        }).catch(err => {
            localStorage.removeItem('accessToken');
            props.handleSetUser(undefined)
        })
    }
    const handleCloseModalLogin = () => {
        setOpenModalLogin(false);
    }
    const handleCloseModalRegister = () => {
        setOpenModalRegister(false);
    }
    const handleOpenModalLogin = () => {
        setOpenModalLogin(true)
    }
    const handleOpenModalRegister = () => {
        setOpenModalRegister(true)
    }
    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        setUser(undefined);
        props.handleSetUser(undefined)
    }
    return (
        <>
            <nav className="p-2 mb-10 border-gray-200 bg-gray-200">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link to="" className="flex">
                        <svg className="h-10 mr-3" width="51" height="70" viewBox="0 0 51 70" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M1 53H27.9022C40.6587 53 51 42.7025 51 30H24.0978C11.3412 30 1 40.2975 1 53Z" fill="#76A9FA"></path><path d="M-0.876544 32.1644L-0.876544 66.411C11.9849 66.411 22.4111 55.9847 22.4111 43.1233L22.4111 8.87674C10.1196 8.98051 0.518714 19.5571 -0.876544 32.1644Z" fill="#A4CAFE"></path><path d="M50 5H23.0978C10.3413 5 0 15.2975 0 28H26.9022C39.6588 28 50 17.7025 50 5Z" fill="#1C64F2"></path></g><defs><clipPath id="clip0"><rect width="51" height="70" fill="white"></rect></clipPath></defs></svg>
                        <span className="self-center text-lg font-semibold whitespace-nowrap">PlayerNation</span>
                    </Link>

                    <div className="flex md:order-2">
                        <div>


                            <div className="relative hidden mr-3 md:mr-0 md:block" id="search-box">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="search-adress-icon" className="block w-full p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                            </div>
                            <button onClick={handleOpenMobileMenu} type="button" className="inline-flex items-center justify-center text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>



                        <div className="border w-fit rounded-xl mx-6  shadow-sm">
                            {user ?
                                <div className="flex ">
                                    <div className="px-4 py-2 rounded-xl">
                                        {user.name}
                                    </div>
                                    <button className="px-4 py-2 rounded-xl text-white m-0 bg-red-500 hover:bg-red-600 transition" onClick={handleLogout}>Logout</button>
                                </div>
                                :
                                <>
                                    <button className="px-4 py-2 rounded-l-xl text-white m-0 bg-blue-500 hover:bg-blue-600 transition" onClick={handleOpenModalLogin}>Login</button>
                                    <button className="px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-100 transition" onClick={handleOpenModalRegister}>Register</button>
                                </>
                            }
                        </div>


                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            {
                                listMenu.map((item: IMenu) => {

                                    const isCurrentPage = utilService.checkSamePath(item.path, window.location.pathname);
                                    if (item.check && !user || item.check && user?.role != "ADMIN") {
                                        return (<></>)
                                    }
                                    return (
                                        <li key={item.title}>
                                            <Link to={item.path}
                                                className={`block py-2 pl-3 pr-4 ${isCurrentPage ? "text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:text-blue-700" : "text-white bg-blue-700 md:text-blue-700"}  marker:rounded md:bg-transparent  md:p-0`}
                                                aria-current={isCurrentPage ? "page" : "false"}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>

                </div>
            </nav >
            {openModalLogin && <LoginModal handleCloseModal={handleCloseModalLogin} setUserInfo={setUserInfo}></LoginModal>}
            {openModalRegister && <RegisterModal handleCloseModal={handleCloseModalRegister} setUserInfo={setUserInfo}></RegisterModal>}

        </>
    )
}