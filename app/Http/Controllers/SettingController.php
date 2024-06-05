<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserValidate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Util\Util;

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
     * @param UpdateUserValidate $request
     */
    public function update(UpdateUserValidate $request)
    {
        $user = $request->user();
        $user->name = $request->name;
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
        return redirect()->route('setting')->with(['message' => '更新しました', 'color' => 'success']);
    }
}
