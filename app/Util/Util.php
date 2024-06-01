<?php

namespace App\Util;

trait Util
{
    /**
     * ランダムな文字列を生成
     * @param int $length
     * @return string
     */
    public function randomStr($length = 12)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }

        return $randomString;
    }

    /**
     * 画像をクロップ
     * @param string $filePath
     * @param string $extension
     */
    public function cropImage($filePath, $extension)
    {
        // 画像を読み込む
        switch ($extension) {
            case 'jpeg':
            case 'jpg':
                $source = imagecreatefromjpeg($filePath); // JPEGファイルを読み込む場合
                break;
            case 'png':
                $source = imagecreatefrompng($filePath); // PNGファイルを読み込む場合
                break;
            default:
                return;
        }
        $width = imagesx($source);
        $height = imagesy($source);

        // クロップサイズを計算
        $size = min($width, $height);

        // クロップの開始座標を計算
        $x = ($width - $size) / 2;
        $y = ($height - $size) / 2;

        // 新しい画像リソースを作成
        $cropped = imagecreatetruecolor($size, $size);

        // 画像をクロップ
        imagecopyresampled($cropped, $source, 0, 0, $x, $y, $size, $size, $size, $size);

        // クロップした画像を保存
        switch ($extension) {
            case 'jpeg':
            case 'jpg':
                imagejpeg($cropped, $filePath, 100); // JPEGファイルを保存する場合
                break;
            case 'png':
                imagepng($cropped, $filePath, 90); // PNGファイルを保存する場合
                break;
        }

        // メモリを解放
        imagedestroy($source);
        imagedestroy($cropped);
    }
}
