import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import {}

function Header () {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <nav className="bg-white border border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UNSW Medical Image Segmentation</span>
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                    <Link
                        to="/"
                        className={`block py-2 px-3 rounded ${
                        activeLink === '/' ? 'text-blue-700' : 'text-gray-900'
                        } md:p-0 dark:text-white md:dark:hover:text-blue-500`}
                    >
                        Home
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/demo"
                        className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 ${
                        activeLink === '/demo' ? 'text-blue-700' : 'text-gray-900'
                        } md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                        Demo
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/manual"
                        className={`block py-2 px-3 rounded ${
                        activeLink === '/manual' ? 'text-blue-700' : 'text-gray-900'
                        } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                        Manual
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/paper"
                        className={`block py-2 px-3 rounded ${
                        activeLink === '/paper' ? 'text-blue-700' : 'text-gray-900'
                        } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                        Paper
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/contact"
                        className={`block py-2 px-3 rounded ${
                        activeLink === '/contact' ? 'text-blue-700' : 'text-gray-900'
                        } hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                        Contact
                    </Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        // <></>

      );
}

export default Header;