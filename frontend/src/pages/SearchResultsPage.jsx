import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResultsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query');
    const searchCategory = queryParams.get('category');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Fetch products based on query and category
        axios
            .get(`http://127.0.0.1:8000/api/products?search=${searchQuery}&category=${searchCategory}`)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, [searchQuery, searchCategory]);

    return (
        <div className="search-results">
            <h2>Search Results for "{searchQuery}" in {searchCategory} category</h2>
            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <div className="products">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product">
                                <h3>{product.name}</h3>
                                <img src={product.img} alt={product.name} />
                                <p>{product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;
