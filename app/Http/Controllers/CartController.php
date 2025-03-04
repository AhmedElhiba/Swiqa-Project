<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    // CartController.php
public function addToCart(Request $request, $id)
{
    $product = Product::findOrFail($id);

    // Retrieve the current cart from session
    $cart = session()->get('cart', []);

    // If the product is already in the cart, increment the quantity
    if(isset($cart[$id])) {
        $cart[$id]['quantity']++;
    } else {
        $cart[$id] = [
            'name' => $product->name,
            'price' => $product->price,
            'quantity' => 1,
            'image_url' => $product->image_url,
        ];
    }

    // Save the cart back to the session
    session()->put('cart', $cart);

    return redirect()->route('cart.show');
}

public function showCart()
{
    $cart = session()->get('cart', []);
    $total = 0;

    // Calculate the total price of the cart
    foreach ($cart as $item) {
        $total += $item['price'] * $item['quantity'];
    }

    return view('cart.show', compact('cart', 'total'));
}

}
