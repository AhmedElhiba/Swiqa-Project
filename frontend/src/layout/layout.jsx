import { Outlet, Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../router";
import { useUserContext } from "../context/ClientContext";
import ClientApi from "../services/api/Client/ClientApi";
import logo from '../images/logoversion4.png';
import ClientDropDownMenu from "./ClientDropDownMenu";
import { useState, useRef, useEffect } from "react";
import Footer from "../pages/Sections/Footer";
import { MdShoppingCart, MdSearch, MdPerson } from "react-icons/md";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Layout({ showNavbar = true }) {
    const { authenticated, logout: contextlogout, user } = useUserContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCategory, setSearchCategory] = useState("All");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const menuRef = useRef(null);
    const searchResultsRef = useRef(null);
    const navRef = useRef(null);
    const categories = ["All", "Veg", "Fruits", "Bio"];
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const location = useLocation();
    const [navHeight, setNavHeight] = useState(0);

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsSearching(true);
                const response = await axios.get("http://127.0.0.1:8000/api/products");
                setProducts(response.data);
                setIsSearching(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsSearching(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on search query and category
    useEffect(() => {
        if (searchQuery.trim()) {
            setShowSearchResults(true);
            const filtered = products.filter((product) => {
                const matchesCategory = searchCategory === "All" || product.category === searchCategory;
                const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });
            setFilteredProducts(filtered);
        } else {
            setShowSearchResults(false);
            setFilteredProducts([]);
        }
    }, [searchQuery, searchCategory, products]);

    // Load cart items count from localStorage on component mount
    useEffect(() => {
        const loadCartItems = () => {
            try {
                const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
                setCartItemsCount(cartItems.length);
            } catch (error) {
                console.error("Error loading cart items:", error);
                setCartItemsCount(0);
            }
        };

        loadCartItems();

        window.addEventListener("storage", loadCartItems);
        window.addEventListener("cartUpdated", loadCartItems);

        return () => {
            window.removeEventListener("storage", loadCartItems);
            window.removeEventListener("cartUpdated", loadCartItems);
        };
    }, []);

    // Calculate and set navbar height
    useEffect(() => {
        const updateNavHeight = () => {
            if (navRef.current) {
                const height = navRef.current.offsetHeight;
                setNavHeight(height);
                document.documentElement.style.setProperty('--nav-height', `${height}px`);
            }
        };

        updateNavHeight();
        window.addEventListener('resize', updateNavHeight);

        return () => {
            window.removeEventListener('resize', updateNavHeight);
        };
    }, [navRef, location.pathname]);

    // Handle clicks outside of menus
    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (menuRef.current && !menuRef.current.contains(event.target)) {
    //             setMobileMenuOpen(false);
    //         }
    //         if (
    //             searchResultsRef.current &&
    //             !searchResultsRef.current.contains(event.target) &&
    //             !event.target.closest("form")
    //         ) {
    //             setShowSearchResults(false);
    //         }
    //     }
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

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
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}&category=${searchCategory}`);
            setShowSearchResults(false);
        }
    };

    const navigateToCart = () => {
        navigate("/cart");
    };

    const navigateToProduct = (productId) => {
        setShowSearchResults(false);
        setSearchQuery("");
        navigate(`/products/${productId}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {showNavbar && (
                <header ref={navRef} className="fixed top-0 left-0 right-0 z-50 w-full">
                    {/* Announcement Bar - Only shown on homepage */}
                    {location.pathname === "/" && (
                        <div className="bg-gradient-to-r from-[#f8ffa8] to-[#e6e68f] text-[#2c5530] py-2 px-4 shadow-sm">
                            <div className="max-w-7xl mx-auto flex justify-center items-center text-xs sm:text-sm md:text-base">
                                <div className="flex items-center justify-center space-x-2">
                                    <span className="font-medium">Free Delivery for Orders Over</span>
                                    <span className="font-bold">100 DH</span>
                                    <span className="hidden sm:inline">|</span>
                                    <span className="hidden sm:inline">We Deliver to All of Morocco</span>
                                    <span className="hidden sm:inline">|</span>
                                    <span className="hidden sm:inline">Minimum Order</span>
                                    <span className="font-bold hidden sm:inline">50 DH</span>
                                    <span className="hidden sm:inline">Required!</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Navigation */}
                    <nav className="bg-themegreen shadow-md">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex items-center justify-between h-16">
                                {/* Logo */}
                                <div className="flex-shrink-0">
                                    <Link to="/" className="flex items-center">
                                        <img
                                            src={logo}
                                            alt="Footer Logo"
                                            className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] h-auto opacity-100 cursor-pointer hover:opacity-90 transition-all"
                                        />

                                    </Link>
                                </div>

                                {/* Search Bar - Desktop */}
                                <div className="hidden md:block flex-grow max-w-2xl mx-4 relative">
                                    <form onSubmit={handleSearch} className="flex items-center">
                                        <div className="relative">
                                            <select
                                                className="h-10 appearance-none bg-[#f3f3f3] text-gray-700 px-3 pr-8 rounded-l-md border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f8ffa8] hover:bg-[#e6e6e6] cursor-pointer text-sm transition-colors"
                                                value={searchCategory}
                                                onChange={(e) => setSearchCategory(e.target.value)}
                                            >
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <input
                                            type="text"
                                            className="w-full h-10 px-4 py-2 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-[#f8ffa8] text-sm placeholder-gray-400"
                                            placeholder="Search Veg, Fruits and more..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />

                                        <button
                                            type="submit"
                                            className="h-10 px-4 bg-[#f8ffa8] hover:bg-[#e6e68f] text-gray-800 font-medium rounded-r-md transition-colors duration-200 flex items-center"
                                        >
                                            <MdSearch className="h-5 w-5" />
                                        </button>
                                    </form>

                                    {/* Search Results Dropdown */}
                                    {showSearchResults && searchQuery && (
                                        <div
                                            ref={searchResultsRef}
                                            className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto"
                                        >
                                            <div className="p-3 border-b border-gray-100">
                                                <h3 className="text-sm font-semibold text-gray-700">
                                                    {isSearching
                                                        ? "Searching..."
                                                        : filteredProducts.length > 0
                                                            ? `Found ${filteredProducts.length} results for "${searchQuery}"`
                                                            : `No results found for "${searchQuery}"`}
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                                                {filteredProducts.slice(0, 6).map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-150"
                                                        onClick={() => navigateToProduct(product.id)}
                                                    >
                                                        <img
                                                            src={product.img}
                                                            alt={product.name}
                                                            className="w-12 h-12 object-cover rounded-md"
                                                        />
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</p>
                                                            <p className="text-xs text-gray-500">{product.category}</p>
                                                            <p className="text-sm font-semibold text-themegreen">{product.price} DH</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {filteredProducts.length > 6 && (
                                                <div className="p-2 text-center border-t border-gray-100">
                                                    <button
                                                        onClick={handleSearch}
                                                        className="text-sm font-medium text-themegreen hover:underline"
                                                    >
                                                        View all {filteredProducts.length} results
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Desktop Navigation Links */}
                                <div className="hidden md:flex items-center space-x-4">
                                    <Link
                                        to="/"
                                        className="text-[#f8ffa8] hover:text-white transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Home
                                    </Link>

                                    {/* Cart Button */}
                                    <button
                                        onClick={navigateToCart}
                                        className="relative p-2 text-[#f8ffa8] hover:text-white hover:bg-[rgba(248,255,168,0.1)] rounded-full transition-colors duration-200"
                                        aria-label="Shopping Cart"
                                    >
                                        <MdShoppingCart className="text-2xl" />
                                        {cartItemsCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-[#f8ffa8] text-[#2c5530] rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center">
                                                {cartItemsCount > 99 ? "99+" : cartItemsCount}
                                            </span>
                                        )}
                                    </button>

                                    {authenticated ? (
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center text-[#f8ffa8]">
                                                <span className="text-sm font-medium">{user?.name}</span>
                                            </div>
                                            <ClientDropDownMenu logout={logout} />
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Link to={LOGIN_ROUTE}>
                                                <button className="px-4 py-1.5 bg-[#f8ffa8] hover:bg-[#e6e68f] text-gray-800 rounded-md transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow">
                                                    Login
                                                </button>
                                            </Link>
                                            <Link
                                                to={REGISTER_ROUTE}
                                                className="text-[#f8ffa8] hover:text-white transition-colors duration-200 px-3 py-1.5 text-sm font-medium"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile menu button */}
                                <div className="md:hidden flex items-center">
                                    <button
                                        onClick={navigateToCart}
                                        className="relative mr-2 p-2 text-[#f8ffa8] hover:text-white hover:bg-[rgba(248,255,168,0.1)] rounded-full transition-colors duration-200"
                                        aria-label="Shopping Cart"
                                    >
                                        <MdShoppingCart className="text-xl" />
                                        {cartItemsCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-[#f8ffa8] text-[#2c5530] rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center">
                                                {cartItemsCount > 99 ? "99+" : cartItemsCount}
                                            </span>
                                        )}
                                    </button>

                                    <button
                                        className="inline-flex items-center justify-center p-2 rounded-md text-[#f8ffa8] hover:text-white hover:bg-[rgba(248,255,168,0.1)] transition-colors duration-200"
                                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Search Bar */}
                            <div className="md:hidden pb-3">
                                <form onSubmit={handleSearch} className="flex items-center">
                                    <div className="relative">
                                        <select
                                            className="h-10 appearance-none bg-[#f3f3f3] text-gray-700 px-2 pr-6 rounded-l-md border-r border-gray-300 focus:outline-none hover:bg-[#e6e6e6] cursor-pointer text-sm"
                                            value={searchCategory}
                                            onChange={(e) => setSearchCategory(e.target.value)}
                                        >
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                                            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <input
                                        type="text"
                                        className="w-full h-10 px-2 py-2 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-[#f8ffa8] text-sm"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />

                                    <button
                                        type="submit"
                                        className="h-10 px-3 bg-[#f8ffa8] hover:bg-[#e6e68f] text-gray-800 font-medium rounded-r-md transition-colors duration-200"
                                    >
                                        <MdSearch className="h-4 w-4" />
                                    </button>
                                </form>

                                {/* Mobile Search Results */}
                                {showSearchResults && searchQuery && (
                                    <div
                                        ref={searchResultsRef}
                                        className="mt-1 bg-white rounded-md shadow-lg max-h-64 overflow-y-auto z-50"
                                    >
                                        <div className="p-2 border-b border-gray-100">
                                            <h3 className="text-xs font-semibold text-gray-700">
                                                {isSearching
                                                    ? "Searching..."
                                                    : filteredProducts.length > 0
                                                        ? `Found ${filteredProducts.length} results`
                                                        : `No results found`}
                                            </h3>
                                        </div>
                                        <div className="divide-y divide-gray-100">
                                            {filteredProducts.slice(0, 4).map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => navigateToProduct(product.id)}
                                                >
                                                    <img
                                                        src={product.img}
                                                        alt={product.name}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                    <div className="ml-2">
                                                        <p className="text-xs font-medium text-gray-800 line-clamp-1">{product.name}</p>
                                                        <p className="text-xs text-themegreen">{product.price} DH</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {filteredProducts.length > 4 && (
                                            <div className="p-2 text-center border-t border-gray-100">
                                                <button
                                                    onClick={handleSearch}
                                                    className="text-xs font-medium text-themegreen hover:underline"
                                                >
                                                    View all results
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Navigation Menu */}
                        <div
                            ref={menuRef}
                            className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden bg-[#2c5530] shadow-lg border-t border-[rgba(248,255,168,0.2)]`}
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link
                                    to="/"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-[#f8ffa8] hover:bg-[rgba(248,255,168,0.1)] transition-colors duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>

                                {authenticated ? (
                                    <>
                                        <div className="flex items-center px-3 py-2 text-[#f8ffa8]">
                                            <span className="text-base font-medium">{user?.name || "User"}</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#f8ffa8] hover:bg-[rgba(248,255,168,0.1)] transition-colors duration-200"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to={LOGIN_ROUTE}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-3 py-2"
                                        >
                                            <button className="w-full px-4 py-2 bg-[#f8ffa8] hover:bg-[#e6e68f] text-gray-800 rounded-md transition-colors duration-200 font-medium text-base shadow-sm">
                                                Login
                                            </button>
                                        </Link>
                                        <Link
                                            to={REGISTER_ROUTE}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-[#f8ffa8] hover:bg-[rgba(248,255,168,0.1)] transition-colors duration-200"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>
            )}

            {/* Main Content */}
            <main className="flex-grow" style={{ paddingTop: showNavbar ? `${navHeight}px` : '0' }}>
                {isSearching && (
                    <div className="flex justify-center items-center pt-16">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-themegreen"></div>
                        <p className="ml-2 text-gray-500">Searching products...</p>
                    </div>
                )}
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}