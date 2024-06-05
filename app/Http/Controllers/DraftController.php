<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DraftController extends Controller
{
    /**
     * 下書き
     */
    public function __invoke()
    {
        return Inertia::render('Draft');
    }
}
