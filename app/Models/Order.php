<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'city',
        'zip_code',
        'total_amount',
        'cart_items',
        'status'
    ];

    protected $casts = [
        'cart_items' => 'array',
        'total_amount' => 'decimal:2'
    ];
}