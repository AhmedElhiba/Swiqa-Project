<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): Response
    {

        $request->authenticate();
        
        $request->session()->regenerate();

        return response()->noContent();
    }
//     public function store(LoginRequest $request)
// {
//     $request->authenticate();
//     $request->session()->regenerate();
    
//     $user = $request->user();
//     $token = $user->createToken('auth-token')->plainTextToken;
    
//     return response()->json([
//         'user' => $user,
//         'token' => $token
//     ]);
// }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();
        
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }
}
