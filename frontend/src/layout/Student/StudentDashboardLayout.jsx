import { Outlet, Link, useNavigate, data } from "react-router-dom";
import { LOGIN_ROUTE } from "../../router";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";


export default function StudentDashboardLayout() {

    const [user, setUser] = useState({});

    const navigate = useNavigate();
    useEffect(() => {
        if (!window.localStorage.getItem('ACCESS_TOKEN', 'test')) {
            navigate(LOGIN_ROUTE)
        }
        axiosClient.get('/user').then(({ data }) => {
            setUser(data),
                console.log(data)
        })
    }, []);

    return (
        <>
            <header>
                <nav className="bg-[rgb(18,53,36)] p-3P">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                        {/* Logo */}
                        <span className="text-2xl font-semibold text-[rgb(239,227,194)]">
                            <a href="/">Swiqa</a>
                        </span>

                        {/* Search Bar & Category Selector */}
                        <div className="flex-grow flex items-center justify-center mx-4">
                            <select className="bg-[rgb(133,169,71)] text-white p-2 rounded-l-md border-none outline-none">
                                <option value="">All Categories</option>
                                <option value="fruits">Fruits</option>
                                <option value="vegetables">Vegetables</option>
                            </select>
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="p-2 w-72 border-none outline-none" 
                            />
                            <button className="bg-[rgb(62,123,39)] text-white px-4 py-2 rounded-r-md">Search</button>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex md:space-x-6">
                            <Link to='/'>
                                <span className="text-[rgb(239,227,194)] hover:text-[rgb(133,169,71)] transition">Home</span>
                            </Link>
                            <Link to={LOGIN_ROUTE}>
                                <span className="text-[rgb(239,227,194)] hover:text-[rgb(133,169,71)] transition">Log out</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main className={'container mx-auto'}>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    User Id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.id}
                                </th>
                                <td class="px-6 py-4">
                                    {user.name}
                                </td>
                                <td class="px-6 py-4">
                                    {user.email}
                                </td>
                                <td class="px-6 py-4">
                                    {user.created_at}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}