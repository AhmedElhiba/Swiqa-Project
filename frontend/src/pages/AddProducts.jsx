import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    img: null, // Store the file
  });

  const [preview, setPreview] = useState(null); // Image preview
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Success/error message

  const handleChange = (e) => {
    if (e.target.name === "img") {
      const file = e.target.files[0];
      setProduct({ ...product, img: file });
      if (file) {
        setPreview(URL.createObjectURL(file)); 
      }
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("img", product.img); // Attach file

    try {
      await axios.post("http://127.0.0.1:8000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Product added successfully!");
      setProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        img: null,
      });
      setPreview(null);
    } catch (error) {
      console.error("Error adding product:", error.response?.data);
      setMessage("Failed to add product.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>
      
      {message && <p className="text-center text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="VEG">VEG</option>
          <option value="BIO">BIO</option>
          <option value="FRUITS">FRUITS</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          step="0.01"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Image Upload */}
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Preview Uploaded Image */}
        {preview && (
          <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded" />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-green-600 text-white font-bold rounded hover:bg-green-800 transition duration-300"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}