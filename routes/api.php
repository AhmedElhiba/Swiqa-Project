<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();

});

// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'destroy']);


require __DIR__.'/auth.php';


