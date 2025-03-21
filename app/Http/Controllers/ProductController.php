<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }
        public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'price' => 'required|numeric|min:0',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image
        ]);
    
        if ($request->hasFile('img')) {
            $imagePath = $request->file('img')->store('storage/images/products/', 'public'); // Store image in 'storage/app/public/uploads'
            $validated['img'] = $imagePath; // Save the path in the database
        }
    
        $product = Product::create($validated);
    
        return response()->json($product, 201);
    }
}