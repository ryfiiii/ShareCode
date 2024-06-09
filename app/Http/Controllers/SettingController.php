<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserValidate;
use App\Models\User;
use Inertia\Inertia;
use App\Util\Util;

class SettingController extends Controller
{
    use Util;

    public function __invoke()
    {
        return Inertia::render('Setting');
    }

    /**
     * ユーザー情報の更新
     * @param UpdateUserValidate $request
     */
    public function update(UpdateUserValidate $request)
    {
        $user = $request->user();

        // ユーザーIDの重複チェック
        if ($user->user_id != $request->user_id && User::where('user_id', $request->user_id)->exists()) {
            return response()->json(['message' => 'そのユーザーIDは既に使用されています', 'color' => 'error'], 422);
        }

        $user->name = $request->name;
        $user->user_id = $request->user_id;
        $user->favorite_language = $request->favorite_language;

        // 画像の保存
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            $extension = $request->avatar->getClientOriginalExtension(); // 拡張子を取得
            $imageName = $this->randomStr() . '_' . time() . '.' . $extension;
            $imageTempUrl = $request->avatar->storeAs('images/avatars', $imageName, 'public'); // 画像を保存
            $filePath = storage_path('app/public/' . $imageTempUrl); // 画像のパス

            $this->cropImage($filePath, $extension); // 画像をクロップし上書き保存

            $imageUrl = env('APP_URL') . '/storage/' . $imageTempUrl; // 画像のURL
            $user->avatar = $imageUrl;
        }

        $user->save();

        // todo axiosでやり取りするように変更
        return response()->json([
            'avatar' => $user->avatar,
            'name' => $user->name,
            'favorite_language' => $user->favorite_language,
            'message' => 'ユーザー情報を更新しました',
            'color' => 'success'
        ]);
    }
}
