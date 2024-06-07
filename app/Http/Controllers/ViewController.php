<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class ViewController extends Controller
{
    public function __invoke(string $slug)
    {
        $post = Post::with('user')->where('slug', $slug)->first();
        return Inertia::render('View', ['post' => $post]);
    }
}
