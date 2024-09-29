import React, { useContext, useState } from 'react'

import { UseContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const { token, setToken } = useContext(UseContext);
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown เปิด-ปิด
    };

    const handlePath = (value) => {
        if (value === 0) {
            navigate(`/adddata/${token}`)
        } else if (value === 1) {
            navigate(`/admin/${token}`)
        } else if (value === 2) {
            logout();
        }
    }

    const logout = async () => {
        const response = await fetch("http://localhost:8000/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        setToken("")
    }
    return (
        <div>
            {token ? (
                <nav className="bg-white border-gray-200 dark:bg-gray-900"
                style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20210227/pngtree-soft-pink-background-image_566546.jpg')" }}>
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
                    
                    >
                        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Music history                            </span>
                        </Link>

                        {/* Dropdown Menu */}
                        <div className="relative inline-block text-left">
                            <button
                                onClick={toggleDropdown} // Toggle การเปิดปิดของเมนู
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-800 dark:text-white"
                            >
                                เมนู
                                {/* Icon for dropdown */}
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414 0L10 11.414l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* Dropdown Content */}
                            {isDropdownOpen && (
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                >
                                    <div className="py-1" role="none">
                                        <button
                                            onClick={() => handlePath(0)} // ปิด dropdown เมื่อคลิกลิงก์
                                            className="w-full text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            เพิ่มเพลง
                                        </button>
                                        <button
                                            onClick={() => handlePath(1)} // ปิด dropdown เมื่อคลิกลิงก์
                                            className="w-full text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            เพลงทั้งหมด
                                        </button>
                                        <button
                                            onClick={() => handlePath(2)} // ปิด dropdown เมื่อคลิกลิงก์
                                            className="w-full text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            ออกจากระบบ
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

            ) : (
                <nav style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20210227/pngtree-soft-pink-background-image_566546.jpg')" }}
                >
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Music history
                            </span>
                        </a>

                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a href="/login" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  " aria-current="page">แอดมิน</a>
                                </li>
                                <li>
                                    <a href="/register" className="block py-2 px-3 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 ">สมัครสมาชิกผู้เข้าชม</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            )}

        </div>
    )
}
