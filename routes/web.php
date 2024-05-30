<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\OAuthController;
use Illuminate\Support\Facades\Route;

/* 認証関係 */

Route::get('/auth/{provider}', [OAuthController::class, 'redirectProvider'])->name('auth.provider');
Route::get('/auth/callback/{provider}', [OAuthController::class, 'callbackProvider']);
Route::get('/logout', [OAuthController::class, 'logout'])->name('logout');

Route::get('/', [HomeController::class, 'index'])->name('home');



Route::get('/dashboard', function () {
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
});
