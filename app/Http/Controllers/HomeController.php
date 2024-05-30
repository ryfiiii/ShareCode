<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        Inertia::share('activeTab', 'home');
        return Inertia::render('Home');
    }
}
