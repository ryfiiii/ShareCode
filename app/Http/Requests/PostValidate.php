<?php

namespace App\Http\Requests;

use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class PostValidate extends FormRequest
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
            'title' => 'required|string|min:1|max:50',
            'comment' => 'nullable|string|max:500',
            'code' => 'required|string|min:1|max:1000',
            'language' => 'required|string|min:1|max:50',
            'publish_status' => 'required|integer|min:0|max:2',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = response()->json(['message' => '不正な操作です'], 422);
        throw new ValidationException($validator, $response);
    }
}
