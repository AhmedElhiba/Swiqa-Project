<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return "hello world!";
});

//require __DIR__.'/auth.php';