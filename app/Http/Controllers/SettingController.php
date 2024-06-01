<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserValidate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Util\Util;
use Illuminate\Support\Facades\Log;

class SettingController extends Controller
{
    use Util;

    public function __invoke()
    {
        return Inertia::render('Setting', [
            'csrf_token' => csrf_token(),
        ]);
    }

    /**
     * ユーザー情報の更新
     * @param Request $request
     */
    public function update(UpdateUserValidate $request)
    {
        $user = $request->user();
        $user->name = $request->name;

        // 画像の保存
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            $imageName = $this->randomStr() . '_' . time() . '.' . $request->avatar->getClientOriginalExtension();
            $imageTempUrl = $request->avatar->storeAs('images/avatars', $imageName, 'public');
            $imageUrl = env('APP_URL') . '/storage/' . $imageTempUrl;
            $user->avatar = $imageUrl;
        }

        $user->save();

        return redirect()->route('setting')->with(['message' => '更新しました', 'color' => 'success']);
    }
}
