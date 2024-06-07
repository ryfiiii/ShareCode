<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    private $pagenate_per_page;

    public function __construct()
    {
        $this->pagenate_per_page = config('paginate.pagenate_per_page');
    }

    public function __invoke(Request $request)
    {
        if ($request->has('page')) {
            return $this->getPosts();
        } else {
            return $this->home();
        }
    }

    /** 
     * 初回ホーム表示 
     */
    public function home()
    {
        $posts = Post::with('user')->where('publish_status', 1)->where('is_draft', false)->paginate($this->pagenate_per_page);
        return Inertia::render('Home', [
            'posts' => [
                'items' => $posts->items(),
                'next_page_url' => $posts->nextPageUrl(),
            ]
        ]);
    }

    /** 
     * 2回目以降apiリクエストを受けた際に呼び出される 
     * @return JsonResponse
     */
    public function getPosts()
    {
        $posts = Post::with('user')->where('publish_status', 1)->where('is_draft', false)->paginate($this->pagenate_per_page);
        return response()->json([
            'posts' => [
                'items' => $posts->items(),
                'next_page_url' => $posts->nextPageUrl(),
            ]
        ]);
    }
}
