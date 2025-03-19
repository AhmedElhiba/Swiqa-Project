<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        DB::table('products')->insert([
            [
                'name' => 'EGGS',
                'category' => 'Bio',
                'price' => 50,
                'img' => asset('storage/images/products/lbid1.png'),
                'description' => 'Fresh organic eggs sourced from free-range farms, rich in protein and essential nutrients.',
            ],
            [
                'name' => 'TOMATO',
                'category' => 'VEG',
                'price' => 7,
                'img' => asset('storage/images/products/maticha1.png'),
                'description' => 'Juicy and ripe tomatoes, perfect for salads, sauces, and healthy meals.',
            ],
            [
                'name' => 'ONION',
                'category' => 'VEG',
                'price' => 4.5,
                'img' => asset('storage/images/products/lbasla1.png'),
                'description' => 'Fresh onions with a strong flavor, ideal for cooking and seasoning dishes.',
            ],
            [
                'name' => 'POTATO',
                'category' => 'VEG',
                'price' => 8,
                'img' => asset('storage/images/products/btata1.png'),
                'description' => 'Versatile and nutritious potatoes, great for frying, boiling, or baking.',
            ],
            [
                'name' => 'APPLE',
                'category' => 'FRUITS',
                'price' => 9,
                'img' => asset('storage/images/products/tfah1.png'),
                'description' => 'Crisp and sweet apples, packed with vitamins and antioxidants for a healthy snack.',
            ],
            [
                'name' => 'WATERMELON',
                'category' => 'FRUITS',
                'price' => 13,
                'img' => asset('storage/images/products/dlah1.png'),
                'description' => 'Refreshing and juicy watermelon, perfect for hot summer days.',
            ],
            [
                'name' => 'BANANA',
                'category' => 'FRUITS',
                'price' => 10,
                'img' => asset('storage/images/products/banan1.png'),
                'description' => 'Sweet and energy-boosting bananas, rich in potassium and fiber.',
            ],
            [
                'name' => 'CARROT',
                'category' => 'VEG',
                'price' => 6,
                'img' => asset('storage/images/products/khizo1.png'),
                'description' => 'Crunchy and nutritious carrots, packed with vitamins for good eyesight and overall health.',
            ],
            [
                'name' => 'LEMON',
                'category' => 'FRUITS',
                'price' => 8,
                'img' => asset('storage/images/products/lemon.png'),
                'description' => 'Zesty and refreshing lemons, perfect for drinks, dressings, and adding flavor to dishes.',
            ],
        ]);
    }
}
