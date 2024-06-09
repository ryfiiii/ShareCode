<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = Auth::user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'name' => $user->name,
                    'email' => $user->email,
                    'user_id' => $user->user_id,
                    'avatar' => $user->avatar,
                    'favorite_language' => $user->favorite_language,
                ] : null,
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message') ?: null,
                'color' => fn () => $request->session()->get('color') ?: null,
            ]
        ];
    }
}
