<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->index(); // 公開URL用のスラッグ
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->text('comment'); // コメント
            $table->text('code'); // コード
            $table->string('language'); // 言語
            $table->integer('likes')->default(0); // いいね数
            $table->unsignedTinyInteger('publish_status')->default(0); // 公開ステータス(0: 非公開, 1: 公開, 2: 限定公開
            $table->boolean('is_draft')->default(true); // 下書きフラグ
            $table->timestamp('published_at')->nullable(); // 公開日時
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
