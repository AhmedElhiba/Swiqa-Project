import { Outlet, Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../router";

export default function Layout() {
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
                            <Link to={LOGIN_ROUTE}>
                                <span className="text-[rgb(239,227,194)] hover:text-[rgb(133,169,71)] transition">Login</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto">
                <Outlet />
            </main>
            <footer className="bg-gray-900 text-white py-6 w-full px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-4">
            <a href="/" className="hover:text-green-400">Home</a>
            <a href="/about" className="hover:text-green-400">About Us</a>
            <a href="/contact" className="hover:text-green-400">Contact</a>
            <a href="/privacy" className="hover:text-green-400">Privacy Policy</a>
          </div>
          <p className="text-xs">&copy; 2025 Swiqa. All Rights Reserved.</p>
        </div>
      </footer>
        </>
    );
}
