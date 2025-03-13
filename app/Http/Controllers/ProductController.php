<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Fetch all products
    public function getProducts()
    {
        $products = Product::all(); 
        //  $product->img = asset('public/images/products/' . $product->img);
        return response()->json($products); // Return products as JSON response
    }
}
