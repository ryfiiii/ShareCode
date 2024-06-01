<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MyPageController;
use App\Http\Controllers\OAuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

/* 認証関係 */

Route::get('/auth/{provider}', [OAuthController::class, 'redirectProvider']);
Route::get('/auth/callback/{provider}', [OAuthController::class, 'callbackProvider']);
Route::get('/logout', [OAuthController::class, 'logout'])->name('logout');

/* ホーム */
Route::get('/', HomeController::class)->name('home');

/* 投稿 */
Route::middleware('sc-auth')->group(function () {
    Route::get('/post', PostController::class)->name('post');
});

/* 設定 */
Route::get('/mypage', MyPageController::class)->name('mypage');

/* 設定 */
Route::middleware('sc-auth')->group(function () {
    Route::get('/setting', SettingController::class)->name('setting');
    Route::post('/setting', [SettingController::class, 'update'])->name('setting.update');
});
