<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostValidate;
use App\Models\Post;
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
    public function post(PostValidate $request)
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
                'message' => $publish_status_text . 'で投稿しました',
                'url' => $post->slug
            ],
            200
        );
    }
}
