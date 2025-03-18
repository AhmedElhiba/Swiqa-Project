<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'user' => Auth::user(), // Pass authenticated user to Inertia
        ]);
    }
}
