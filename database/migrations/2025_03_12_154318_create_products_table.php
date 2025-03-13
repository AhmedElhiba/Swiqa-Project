<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('products', function (Blueprint $table) {
        $table->id();                // Auto-incrementing primary key
        $table->string('name');       // Name of the product
        $table->string('category');   // Category of the product (e.g., Fruit, Vegetable, etc.)
        $table->decimal('price', 8, 2); // Price of the product
        $table->string('img')->nullable(); // Image file path (nullable if no image)
        $table->timestamps();         // Timestamps for created_at and updated_at
    });
}

public function down()
{
    Schema::dropIfExists('products');
}

};
