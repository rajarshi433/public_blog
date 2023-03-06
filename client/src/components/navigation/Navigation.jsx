import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import { RiFolder5Line, RiNotification2Line } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { BsPencilSquare, BsBookmarks } from "react-icons/bs";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoCaretBackCircleOutline } from "react-icons/io5";

import { auth } from "../../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { logout } from "../../store/slice/authSlice";

const menus = [
    { title: "Home", icon: <IoHomeOutline />, path: "/" },
    { title: "Notifications", icon: <RiNotification2Line />, path: "#", number: true },
    { title: "Writings", icon: <RiFolder5Line />, path: "/myposts" },
    { title: "Bookmarks", icon: <BsBookmarks />, path: "/bookmarks" },
    { title: "Write", icon: <BsPencilSquare />, path: "/createpost" },
];


const Navigation = () => {

    const uid = useSelector((state) => state.auth.uid);
    const userInfo = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [showLeftbar, setShowLeftbar] = useState(false);
    const [userM, setUserM] = useState();
    const modalRef = useRef();
    const leftbarRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseModal = (event) => {
        if (!modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    const handleCloseLeftbar = (event) => {
        if (!leftbarRef.current.contains(event.target)) {
            setShowLeftbar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseModal);
        document.addEventListener('mousedown', handleCloseLeftbar);
        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
            document.removeEventListener('mousedown', handleCloseLeftbar);
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
        navigate("/")
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUserM(currentUser.email)

            } else {
                setUserM("BlogMate")
            }
        });
    }, [userM]);



    return (
        <>
            {/* Leftbar */}
            <aside ref={leftbarRef} className={`fixed top-0 left-0 z-30 lg:z-0 w-52 lg:w-16 h-screen pt-20 transition-transform ${showLeftbar ? "" : "-translate-x-full"} bg-main border-r lg:translate-x-0`}>
                <div className="h-full px-3 pb-4 overflow-y-auto mt-14">

                    <IoCaretBackCircleOutline className="lg:hidden absolute top-4 right-2 text-white text-4xl cursor-pointer" onClick={() => setShowLeftbar(!showLeftbar)}></IoCaretBackCircleOutline>
                    <ul className="space-y-3">
                        {
                            menus.map((menu, index) => {
                                return (
                                    <li key={index} onClick={() => setShowLeftbar(!showLeftbar)}>
                                        <Link to={menu.path} className="flex items-center p-2 font-normal text-white rounded-lg hover:bg-gray-600 text-2xl">
                                            {menu.icon}
                                            <span className="flex-1 ml-3 whitespace-nowrap text-base lg:hidden font-Ubuntu">
                                                {menu.title}
                                            </span>
                                            {menu.number ? (
                                                <span className="inline-flex items-center justify-center w-3 h-3 mr-3 text-xs font-medium text-white rounded-full lg:hidden">
                                                    ●
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </aside>
            {/* Leftbar End */}

            {/* Topbar */}
            <nav className="fixed top-0 w-full border border-gray-200 z-20 lg:z-30 bg-white">
                <div className="px-3 py-3 lg:px-5 lg:pl-3 ml-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={() => setShowLeftbar(!showLeftbar)}
                                className="inline-flex items-center p-2 text-sm text-black rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                <span className="text-2xl">
                                    <HiMenuAlt2 />
                                </span>
                            </button>
                            <Link to="/" className="flex ml-2 md:mr-24">
                                <img
                                    src={logo}
                                    className="h-9 -mt-2 mr-3"
                                    alt="Blogmate"
                                />
                                <span className="self-center text-xl font-Satisfy font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    {userM}
                                </span>
                            </Link>
                        </div>

                        <div className={`flex items-center mr-4 ${showModal ? "z-30" : ''}`} ref={modalRef}>
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        src={userInfo.photoURL}
                                        alt="user photo"
                                        onClick={() => setShowModal(!showModal)}
                                    />
                                </div>
                                <div
                                    className={`${showModal ? "" : 'hidden'} my-4 text-base list-none bg-gray-300 text-black divide-y divide-gray-900 rounded shadow fixed top-12 right-8`}>
                                    <div className="px-4 py-3 font-Josefin-Sans text-green-800" role="none">
                                        <p className="text-sm" role="none">
                                            {userInfo.displayName}
                                        </p>
                                        <p
                                            className="text-sm font-medium truncate"
                                            role="none"
                                        >
                                            {userInfo.email}
                                        </p>
                                    </div>
                                    <ul className="py-1 font-semibold font-Josefin-Sans" role="none">
                                        <li>
                                            <Link
                                                to={`/myprofile/${uid}`}
                                                className="block px-4 py-2 text-sm hover:bg-gray-300"
                                                role="menuitem"
                                                onClick={() => setShowModal(!showModal)}
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                className="block px-4 py-2 text-sm hover:bg-gray-300"
                                                role="menuitem"
                                                onClick={handleLogout}
                                            >
                                                Sign out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Topbar End */}
        </>
    );
}

export default Navigation;
