import { Outlet, Link, Navigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../router";
import { useUserContext } from "../context/ClientContext";
import ClientApi from "../services/api/Client/ClientApi";
import ClientDropDownMenu from "./ClientDropDownMenu";

export default function Layout() {
    const { authenticated, logout:contextlogut } = useUserContext();

    const logout = async () => {
        ClientApi.logout().then(()=>{
            contextlogut()
            Navigate(HOME_ROUTE)
        })
    }

    return (
        <>
            <header>
                <nav className="bg-[rgb(18,53,36)] p-4">
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
                            
                            {authenticated ? (
                                <ClientDropDownMenu/>                               
                            ) : (
                                <Link to={LOGIN_ROUTE}>
                                    <span className="text-[rgb(239,227,194)] hover:text-[rgb(133,169,71)] transition">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto">
                <Outlet />
            </main>
        </>
    );
}
