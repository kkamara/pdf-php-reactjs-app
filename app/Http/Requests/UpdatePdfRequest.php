<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePdfRequest extends FormRequest
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
        /* Put. */
        if ($this->method() === "PUT") {
            return [
                "name" => [
                    "required", 
                    "min:3", 
                    "max:30"
                ],
                "birthday" => [
                    "required", 
                    "min:3",
                    "max:30"
                ]
            ];
        } else { /* Patch. */
            return [
                "name" => [
                    "sometimes",
                    "required", 
                    "min:3", 
                    "max:30"
                ],
                "birthday" => [
                    "sometimes",
                    "required", 
                    "min:3",
                    "max:30"
                ]
            ];
        }
    }
}
