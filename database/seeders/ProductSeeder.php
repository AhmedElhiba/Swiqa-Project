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
            ],
            [
                'name' => 'TOMMATO',
                'category' => 'VEG',
                'price' => 10,
                'img' => asset('storage/images/products/maticha1.png'),
            ],
            [
                'name' => 'ONION',
                'category' => 'VEG',
                'price' => 10,
                'img' => asset('storage/images/products/lbasla1.png'),
            ],
            [
                'name' => 'POTATO',
                'category' => 'VEG',
                'price' => 10,
                'img' => asset('storage/images/products/btata1.png'),
            ],
            [
                'name' => 'APPLE',
                'category' => 'FRUITS',
                'price' => 10,
                'img' => asset('storage/images/products/tfah1.png'),
            ],
            [
                'name' => 'WATERMELON',
                'category' => 'FRUITS',
                'price' => 10,
                'img' => asset('storage/images/products/dlah1.png'),
            ],
            [
                'name' => 'BANANA',
                'category' => 'FRUITS',
                'price' => 10,
                'img' => asset('storage/images/products/banan1.png'),
            ],
            [
                'name' => 'CARROT',
                'category' => 'VEG',
                'price' => 10,
                'img' => asset('storage/images/products/khizo1.png'),
            ],
            [
                'name' => 'LEMMON',
                'category' => 'FRUITS',
                'price' => 10,
                'img' => asset('storage/images/products/lemon.png'),
            ],
        ]);
    }
}