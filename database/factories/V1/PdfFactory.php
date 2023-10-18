<?php

namespace Database\Factories\V1;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\V1\Pdf>
 */
class PdfFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $usersId = User::factory()
                ->count(1)
                ->create()
                ->first()
                ->id;
        $content = file_get_contents(
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        );
        $content = base64_encode(
            $content
        );
        return [
            "users_id" => $usersId,
            "name" => fake()->company(),
            "birthday" => fake()->paragraph(),
            "content" => $content
        ];
    }
}
