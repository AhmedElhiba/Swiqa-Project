import { useState, useEffect } from "react";
import { Trash2, Edit, Plus, Save, X, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";

export default function ProductManagement() {
  // Main states
  const [products, setProducts] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Product form state
  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    category: "VEG",
    description: "",
    price: "",
    img: null,
  });

  // Image preview
  const [preview, setPreview] = useState(null);

  // Categories with icons and colors
  const categories = [
    { value: "VEG", label: "Vegetables", color: "bg-green-500", icon: "🥬" },
    { value: "BIO", label: "BIO", color: "bg-teal-500", icon: "🌱" },
    { value: "FRUITS", label: "Fruits", color: "bg-red-500", icon: "🍎" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      
      const response = await fetch("http://127.0.0.1:8000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      showNotification("Failed to load products", "error");
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "img") {
      const file = e.target.files[0];
      setProductForm({ ...productForm, img: file });
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setProductForm({ ...productForm, [e.target.name]: e.target.value });
    }
  };

  const resetForm = () => {
    setProductForm({
      id: null,
      name: "",
      category: "VEG",
      description: "",
      price: "",
      img: null,
    });
    setPreview(null);
    setIsAddMode(false);
    setIsEditMode(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("category", productForm.category);
    formData.append("description", productForm.description);
    formData.append("price", productForm.price);
    
    if (productForm.img) {
      formData.append("img", productForm.img);
    }

    // If editing, append the ID or use PUT method
    const url = isEditMode 
      ? `http://127.0.0.1:8000/api/products/${productForm.id}`
      : "http://127.0.0.1:8000/api/products";
    
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save product");
      
      await fetchProducts(); // Refresh the product list
      showNotification(
        isEditMode ? "Product updated successfully!" : "Product added successfully!",
        "success"
      );
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      showNotification("Failed to save product", "error");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");
      
      await fetchProducts(); // Refresh the product list
      showNotification("Product deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("Failed to delete product", "error");
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setIsEditMode(true);
    setSelectedProduct(product);
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      img: product.img, // We don't get the file back, just the URL
    });
    
    // Set preview from the product's image URL
    // Make sure this URL is correct - it should be the complete path to the image
    // if (product.image_url) {
    //   setPreview(product.image_url.startsWith('http') 
    //     ? product.image_url 
    //     : `http://127.0.0.1:8000${product.image_url}`);
    // }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 10000);
  };

  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0];
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-6">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-18 right-5 p-5 rounded-lg shadow-lg flex items-center gap-3 transition-all ${
          notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {notification.type === "success" ? 
            <CheckCircle className="w-5 h-5" /> : 
            <AlertCircle className="w-5 h-5" />
          }
          <p>{notification.message}</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
          <button 
            onClick={() => setIsAddMode(!isAddMode)} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isAddMode ? "bg-gray-600 text-white" : "bg-blue-600 text-white"
            } transition-colors shadow-md hover:shadow-lg`}
          >
            {isAddMode ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {isAddMode ? "Cancel" : "Add Product"}
          </button>
        </div>

        {/* Add/Edit Product Form */}
        {(isAddMode || isEditMode) && (
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8 transition-all">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="grid grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <label 
                        key={cat.value}
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                          productForm.category === cat.value
                            ? `${cat.color} text-white border-transparent`
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={cat.value}
                          checked={productForm.category === cat.value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <span className="text-lg">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <div className="relative">
                    <span className="absolute left-1 top-3 text-gray-500">DH </span>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-32"
                    placeholder="Describe your product"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    preview ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}>
                    {!preview ? (
                      <>
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <span className="mt-2 block text-sm text-gray-600">
                          Click to upload or drag and drop
                        </span>
                        <input
                          type="file"
                          name="img"
                          accept="image/*"
                          onChange={handleInputChange}
                          className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                          required={!isEditMode} // Only required for new products
                        />
                      </>
                    ) : (
                      <div className="relative">
                        <img src={preview} alt="Preview" className="mx-auto max-h-40 rounded" />
                        <button 
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            setProductForm({...productForm, img: null});
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {isEditMode && !productForm.img ? "Leave empty to keep the current image" : "JPG, PNG or GIF, max 5MB"}
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Product"}
                  <Save className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">Products List</h2>
          </div>
          
          {loading && !isAddMode && !isEditMode ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <ImageIcon className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-2 text-xl font-medium text-gray-900">No products yet</h3>
              <p className="mt-1 text-gray-500">Get started by adding your first product</p>
              <button
                onClick={() => setIsAddMode(true)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {products.map((product) => {
                const category = getCategoryInfo(product.category);
                return (
                  <div key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-200">
                      {/* Use complete image URL with backend path */}
                      {product.image_url ? (
                        <img 
                          src={product.image_url.startsWith('http') 
                            ? product.image_url 
                            : `http://127.0.0.1:8000${product.image_url}`} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/400/300";
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100">
                          <ImageIcon className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm text-white ${category.color}`}>
                        {category.icon} {category.label}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <span className="text-lg font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                      
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}