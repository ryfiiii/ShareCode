<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    /**
     * 指定されたプロバイダへリダイレクト
     * @param string $provider
     */
    public function redirectProvider($provider)
    {
        if (!in_array($provider, config('providers.providers.auth'))) {
            return redirect()->route('home')->with(['message' => '不正な操作です', 'color' => 'error']);
        }
        if (Auth::check()) {
            return redirect()->route('home')->with(['message' => '既にログインしています', 'color' => 'info']);
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
            return redirect()->route('home')->with(['message' => 'ログインに失敗しました', 'color' => 'error']);
        } catch (Exception $e) {
            Log::error('不明なエラー: ' . $e);
            return redirect()->route('home')->with(['message' => 'ログインに失敗しました', 'color' => 'error']);
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
        return redirect()->route('home')->with(['message' => 'ログインしました', 'color' => 'success']);
    }

    /**
     * ログアウト
     */
    public function logout()
    {
        Auth::logout();
        return redirect()->route('home')->with(['message' => 'ログアウトしました', 'color' => 'info']);
    }
}
