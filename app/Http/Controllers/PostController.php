<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Post');
    }

    /**
     * 投稿を保存する
     */
    public function post(Request $request) // todo バリデーションを追加する
    {
        $post = new Post();
        $post->slug = Str::uuid()->toString();
        $post->user_id = $request->user()->id;
        $post->title = $request->title;
        $post->comment = $request->comment;
        $post->code = $request->code;
        $post->language = $request->language;
        $post->likes = 0;
        $post->publish_status = $request->publish_status; // 0: 非公開, 1: 公開, 2: 限定公開
        $post->is_draft = false;
        $post->published_at = now();
        $post->save();

        $publish_status_text = config('publish_status')[$post->publish_status];

        return response()->json(
            [
                'color' => 'success',
                'message' => $publish_status_text . 'で投稿しました',
                'url' => $post->slug
            ],
            200
        );
    }
}
