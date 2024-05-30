<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __invoke()
    {
        Inertia::share('activeTab', 'post');
        return Inertia::render('Post');
    }
}
