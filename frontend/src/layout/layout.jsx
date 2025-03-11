import { Outlet, Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../router";
import { useUserContext } from "../context/ClientContext";
import ClientApi from "../services/api/Client/ClientApi";
import ClientDropDownMenu from "./ClientDropDownMenu";
import logoswiqa from '../images/LOGOSWIQA.png';
import { useState, useRef, useEffect } from 'react';
import Footer from "../pages/Sections/Footer";

export default function Layout({ showNavbar = true }) {
    const { authenticated, logout: contextlogout, user } = useUserContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCategory, setSearchCategory] = useState("All");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [navHeight, setNavHeight] = useState(0);
    const navRef = useRef(null);
    const categories = ["All", "Veg", "Fruits", "Bio"];

    useEffect(() => {
        if (navRef.current) {
            const height = navRef.current.offsetHeight;
            setNavHeight(height);
        }
    }, [navRef]);

    const logout = async () => {
        try {
            await ClientApi.logout();
            contextlogout();
            navigate(HOME_ROUTE);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement your search functionality here
        console.log(`Searching for: "${searchQuery}" in category: ${searchCategory}`);
        // navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(searchCategory)}`);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="flex flex-col min-h-screen">
            {showNavbar && (
                <header ref={navRef} className="fixed top-0 left-0 right-0 z-50">
                                        <div id="topbar" className="bg-[#f8ffa8] text-[#2c5530] text-sm lg:text-base font-semibold text-center py-2">
                         Free Delivery for Orders Over <span className="font-bold">100 DH</span>  |   We Deliver to All of Morocco  |   Minimum Order <span className="font-bold">50 DH</span> Required !
                    </div>

                    <nav className="bg-themegreen p-4 shadow-md">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                            {/* Logo */}
                            <span className="text-2xl font-semibold text-[rgb(239,227,194)] flex items-center">
                                {/* <img src={logoswiqa} alt="/" className="w-16 px-1" /> */}
                                <h1 className="text-[#f8ffa8] py-1 px-1">Swiqa</h1>
                            </span> 

                            {/* Mobile menu button */}
                            <button 
                                className="md:hidden inline-flex items-center p-2 ml-3 text-[#f8ffa8] rounded-lg hover:bg-[rgba(248,255,168,0.2)]"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                            </button>

                            {/* Search Bar - Full Width on Mobile, Centered on Desktop */}
                            <div className="w-full md:w-3/5 order-3 md:order-2 mt-4 md:mt-0">
                                <form onSubmit={handleSearch} className="flex items-center">
                                    {/* Category Selector */}
                                    <div className="relative">
                                        <select
                                            className="h-10 appearance-none bg-[#f3f3f3] text-gray-700 px-2 md:px-3 pr-6 md:pr-8 rounded-l-md border-r border-gray-300 focus:outline-none hover:bg-[#e6e6e6] cursor-pointer text-sm md:text-base"
                                            value={searchCategory}
                                            onChange={(e) => setSearchCategory(e.target.value)}
                                        >
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-2 text-gray-700">
                                            <svg className="fill-current h-3 w-3 md:h-4 md:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Search Input */}
                                    <input
                                        type="text"
                                        className="w-full h-10 px-2 md:px-4 py-2 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-[#f8ffa8] text-sm md:text-base"
                                        placeholder="Search Veg, Fruits and more..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />

                                    {/* Search Button */}
                                    <button
                                        type="submit"
                                        className="h-10 px-3 md:px-4 bg-[#f8ffa8] hover:bg-[#e6e68f] text-gray-800 font-medium rounded-r-md transition-colors duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </form>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex md:space-x-4 items-center justify-end order-2 md:order-3">
                                <Link to='/' className="text-[rgb(239,227,194)] hover:text-[rgb(133,169,71)] transition">
                                    Home
                                </Link>
                                {authenticated ? (
                                    <div className="flex items-center">
                                        <div className="flex items-center mr-3 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            <span>{user?.name}</span>
                                        </div>
                                        <ClientDropDownMenu logout={logout} />
                                    </div>
                                ) : (
                                    <>
                                        <Link to={LOGIN_ROUTE}>
                                            <button className="px-4 py-1.5 bg-[#f8ffa8] hover:bg-[#e6e68f] text-gray-800 rounded-md transition-colors duration-200 font-medium">
                                                Login
                                            </button>
                                        </Link>
                                        <Link to={REGISTER_ROUTE} className="text-[rgb(239,227,194)] hover:text-[rgb(133,169,71)] transition">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile Navigation Menu */}
                            <div 
                                ref={menuRef}
                                className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full md:hidden order-4 mt-4 bg-[#2c5530] rounded-lg p-4`}
                            >
                                <div className="flex flex-col space-y-4">
                                    <Link to='/' className="text-[rgb(239,227,194)] hover:text-[rgb(133,169,71)] transition px-2 py-1">
                                        Home
                                    </Link>
                                    {authenticated ? (
                                        <>
                                            <div className="flex items-center px-2 py-1 text-[#f8ffa8]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                                <span>{user?.name || "User"}</span>
                                            </div>
                                            <div className="px-2 py-1">
                                                <button 
                                                    onClick={logout}
                                                    className="text-[rgb(239,227,194)] hover:text-[rgb(133,169,71)] transition"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link to={LOGIN_ROUTE} className="px-2 py-1">
                                                <button className="w-full px-4 py-1.5 bg-[#f8ffa8] hover:bg-[#e6e68f] text-gray-800 rounded-md transition-colors duration-200 font-medium">
                                                    Login
                                                </button>
                                            </Link>
                                            <Link to={REGISTER_ROUTE} className="text-[rgb(239,227,194)] hover:text-[rgb(133,169,71)] transition px-2 py-1">
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            )}
            {/* Create a spacer element with the same height as the navbar */}
            {showNavbar && <div style={{ height: `${navHeight}px` }} />}
            {/* Main content without additional padding */}
            <main className="flex-grow">
                <Outlet />
                <Footer/>
            </main>
        </div>
    );
}