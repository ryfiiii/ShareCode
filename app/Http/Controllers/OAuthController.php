<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    /**
     * 指定されたプロバイダへリダイレクト
     * @param string $provider
     * @return void
     */
    public function redirectProvider($provider)
    {
        if (!in_array($provider, config('providers.providers'))) {
            return redirect("/")->with('message', '不正な操作を検知しました');
        }
        if (Auth::check()) {
            return redirect("/")->with('message', 'すでにログインしています');
        }
        return Socialite::driver($provider)->redirect();
    }

    /**
     * 指定されたプロバイダのコールバック
     * @param string $provider
     */
    public function callbackProvider($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
        } catch (ClientException $e) {
            Log::error($provider . '認証エラー: ' . $e->getMessage());
            return Inertia::render('Home');
        } catch (Exception $e) {
            Log::error('エラー: ' . $e->getMessage());
            return Inertia::render('Home');
        }

        $user = User::updateOrCreate(
            [
                'provider_id' => $socialUser->getId(),
                'provider' => $provider,
            ],
            [
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'avatar' => $socialUser->getAvatar(),
                'token' => $socialUser->token,
                'token_secret' => $socialUser->tokenSecret ?? null,
            ]
        );

        Auth::login($user, true);
        return Inertia::render('Home');
    }

    /**
     * ログアウト
     */
    public function logout()
    {
        Auth::logout();
        return Inertia::render('Home');
    }
}
