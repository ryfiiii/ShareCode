<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Util\Util;
use Exception;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    use Util;

    /**
     * 指定されたプロバイダへリダイレクト
     * @param string $provider
     */
    public function redirectProvider($provider)
    {
        if (!in_array($provider, config('providers'))) {
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
            Log::error('不明なエラー: ' . $e); // todo Githubログイン時のバグを修正する
            return redirect()->route('home')->with(['message' => 'ログインに失敗しました', 'color' => 'error']);
        }

        $user = User::where('provider_id', $socialUser->getId())->where('provider', $provider)->first();

        // ユーザーが存在する場合はログイン
        if ($user) {
            Auth::login($user, true);
            return redirect()->route('home')->with(['message' => 'ログインしました', 'color' => 'success']);
        }

        // ユーザーが存在しない場合は新規作成
        $newUser = User::create([
            'provider_id' => $socialUser->getId(),
            'provider' => $provider,
            'name' => $socialUser->getName(),
            'user_id' => $this->generateUniqueUserId(),
            'email' => $socialUser->getEmail(),
            'avatar' => $socialUser->getAvatar(),
            'favorite_language' => 'javascript', // デフォルトはjavascript
            'token' => $socialUser->token,
            'token_secret' => $socialUser->tokenSecret ?? null,
        ]);

        Auth::login($newUser, true);
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

    /**
     * 重複しないユーザーIDを生成
     */
    private function generateUniqueUserId()
    {
        $userId = $this->randomStr(10);
        // 重複するユーザーIDが存在する場合は再帰的に呼び出す
        if (User::where('user_id', $userId)->exists()) {
            return $this->generateUniqueUserId();
        }
        return $userId;
    }
}
