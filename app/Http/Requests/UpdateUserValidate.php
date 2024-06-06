<?php

namespace App\Http\Requests;

use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class UpdateUserValidate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'avatar' => 'image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|min:1|max:25',
            'favorite_language' => 'required|string|min:1|max:100',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();

        Log::error('バリデーションエラーが発生しました。', ['errors' => $errors]);

        if ($errors->has('avatar')) {
            $response = response()->json(['message' => '画像の形式はpng/jpg/jpegで2MB以内にしてください', 'color' => 'error'], 422);
        } else {
            $response = response()->json(['message' => '入力内容に誤りがあります。', 'color' => 'error'], 422);
        }

        throw new ValidationException($validator, $response);
    }
}
