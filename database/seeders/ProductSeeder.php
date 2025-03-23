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
                'name' => 'EGGS 24pc',
                'category' => 'Bio',
                'price' => 50,
                'img' => asset('storage/images/products/lbid1.png'),
                'description' => 'Fresh organic eggs sourced from free-range farms, rich in protein and essential nutrients.',
            ],
            [
                'name' => 'TOMATO 1kg',
                'category' => 'VEG',
                'price' => 7,
                'img' => asset('storage/images/products/maticha1.png'),
                'description' => 'Juicy and ripe tomatoes, perfect for salads, sauces, and healthy meals.',
            ],
            [
                'name' => 'ONION 1kg',
                'category' => 'VEG',
                'price' => 4.5,
                'img' => asset('storage/images/products/lbasla1.png'),
                'description' => 'Fresh onions with a strong flavor, ideal for cooking and seasoning dishes.',
            ],
            [
                'name' => 'POTATO 1kg',
                'category' => 'VEG',
                'price' => 8,
                'img' => asset('storage/images/products/btata1.png'),
                'description' => 'Versatile and nutritious potatoes, great for frying, boiling, or baking.',
            ],
            [
                'name' => 'APPLE 1kg',
                'category' => 'FRUITS',
                'price' => 9,
                'img' => asset('storage/images/products/tfah1.png'),
                'description' => 'Crisp and sweet apples, packed with vitamins and antioxidants for a healthy snack.',
            ],
            [
                'name' => 'WATERMELON 1kg',
                'category' => 'FRUITS',
                'price' => 13,
                'img' => asset('storage/images/products/dlah1.png'),
                'description' => 'Refreshing and juicy watermelon, perfect for hot summer days.',
            ],
            [
                'name' => 'BANANA 1kg',
                'category' => 'FRUITS',
                'price' => 10,
                'img' => asset('storage/images/products/banan1.png'),
                'description' => 'Sweet and energy-boosting bananas, rich in potassium and fiber.',
            ],
            [
                'name' => 'CARROT 1kg',
                'category' => 'VEG',
                'price' => 6,
                'img' => asset('storage/images/products/khizo1.png'),
                'description' => 'Crunchy and nutritious carrots, packed with vitamins for good eyesight and overall health.',
            ],
            [
                'name' => 'LEMON 1kg',
                'category' => 'FRUITS',
                'price' => 8,
                'img' => asset('storage/images/products/lemon.png'),
                'description' => 'Zesty and refreshing lemons, perfect for drinks, dressings, and adding flavor to dishes.',
            ],
            [
                'name' => ' MILK',
                'category' => 'Bio',
                'price' => 15,
                'img' => asset('storage/images/products/milk.png'),
                'description' => 'Organic milk from free-range cows, rich in nutrients and free from harmful chemicals.',
            ],
            [
                'name' => ' HONEY 1kg',
                'category' => 'Bio',
                'price' => 90,
                'img' => asset('storage/images/products/honey.png'),
                'description' => 'Pure organic honey, harvested from local bees without the use of chemicals or additives.',
            ],
            [
                'name' => ' CHEESE 200g',
                'category' => 'Bio',
                'price' => 38,
                'img' => asset('storage/images/products/cheese.png'),
                'description' => 'Delicious and creamy organic cheese, made with the finest milk from free-range cows.',
            ],
            [
                'name' => ' BUTTER 200g',
                'category' => 'Bio',
                'price' => 15,
                'img' => asset('storage/images/products/butter.png'),
                'description' => 'Rich and flavorful organic butter, made from the milk of free-range cows.',
            ],
            [
                'name' => 'GRAPES 1kg',
                'category' => 'FRUITS',
                'price' => 12,
                'img' => asset('storage/images/products/grapes.png'),
                'description' => 'Sweet and juicy grapes, ideal for snacking and making wine.',
            ],
            [
                'name' => 'CABBAGE 1kg',
                'category' => 'VEG',
                'price' => 5,
                'img' => asset('storage/images/products/cabbage.png'),
                'description' => 'Fresh and crunchy cabbage, great for salads, soups, and stir-fries.',
            ],
            [
                'name' => 'ORANGE 1kg',
                'category' => 'FRUITS',
                'price' => 10,
                'img' => asset('storage/images/products/orange.png'),
                'description' => 'Citrusy and refreshing oranges, rich in vitamin C for immune support.',
            ],
            [
                'name' => 'PEAR 1kg',
                'category' => 'FRUITS',
                'price' => 11,
                'img' => asset('storage/images/products/pear.png'),
                'description' => 'Sweet and juicy pears, perfect for a nutritious snack.',
            ],
            [
                'name' => 'PINEAPPLE 1kg',
                'category' => 'FRUITS',
                'price' => 19,
                'img' => asset('storage/images/products/pineapple.png'),
                'description' => 'Tropical and sweet pineapples, perfect for smoothies, fruit salads, and grilling.',
            ],
        ]);
    }
}
