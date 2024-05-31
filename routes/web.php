<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\OAuthController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

/* 認証関係 */

Route::get('/auth/{provider}', [OAuthController::class, 'redirectProvider'])->name('auth.provider');
Route::get('/auth/callback/{provider}', [OAuthController::class, 'callbackProvider']);
Route::get('/logout', [OAuthController::class, 'logout'])->name('logout');

Route::get('/', HomeController::class)->name('home');
Route::get('/post', PostController::class)->name('post');



Route::get('/dashboard', function () {
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
});
