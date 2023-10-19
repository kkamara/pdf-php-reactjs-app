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
        return [
            "users_id" => $usersId,
            "name" => fake()->company(),
            "birthday" => fake()->sentence(),
            "content" => "JVBERi0xLjcKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZwovT3V0bGluZXMgMiAwIFIKL1BhZ2VzIDMgMCBSID4+CmVuZG9iagoyIDAgb2JqCjw8IC9UeXBlIC9PdXRsaW5lcyAvQ291bnQgMCA+PgplbmRvYmoKMyAwIG9iago8PCAvVHlwZSAvUGFnZXMKL0tpZHMgWzYgMCBSCl0KL0NvdW50IDEKL1Jlc291cmNlcyA8PAovUHJvY1NldCA0IDAgUgovRm9udCA8PCAKL0YxIDggMCBSCj4+Cj4+Ci9NZWRpYUJveCBbMC4wMDAgMC4wMDAgODQxLjg5MCA1OTUuMjgwXQogPj4KZW5kb2JqCjQgMCBvYmoKWy9QREYgL1RleHQgXQplbmRvYmoKNSAwIG9iago8PAovUHJvZHVjZXIgKP7/AGQAbwBtAHAAZABmACAAMgAuADAALgAzACAAKwAgAEMAUABEAEYpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyMzEwMTgxMjE1NDQrMDAnMDAnKQovTW9kRGF0ZSAoRDoyMDIzMTAxODEyMTU0NCswMCcwMCcpCj4+CmVuZG9iago2IDAgb2JqCjw8IC9UeXBlIC9QYWdlCi9NZWRpYUJveCBbMC4wMDAgMC4wMDAgODQxLjg5MCA1OTUuMjgwXQovUGFyZW50IDMgMCBSCi9Db250ZW50cyA3IDAgUgo+PgplbmRvYmoKNyAwIG9iago8PCAvRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDEwMiA+PgpzdHJlYW0KeJzjMtAzMDBQQCaL0rmcQhSMTfQMDM0UTI3N9SxMLRVCUhT03QwVDI30DBRC0hQUojX8EnNTrRRS0lKK04o1YxVCvBRcQ5A0mlia6xmbmGPR6JRZVJKRklgJ0lwM1A7TDABvoyGbCmVuZHN0cmVhbQplbmRvYmoKOCAwIG9iago8PCAvVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL05hbWUgL0YxCi9CYXNlRm9udCAvVGltZXMtUm9tYW4KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKPj4KZW5kb2JqCnhyZWYKMCA5CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDc0IDAwMDAwIG4gCjAwMDAwMDAxMjAgMDAwMDAgbiAKMDAwMDAwMDI3NCAwMDAwMCBuIAowMDAwMDAwMzAzIDAwMDAwIG4gCjAwMDAwMDA0NTIgMDAwMDAgbiAKMDAwMDAwMDU1NSAwMDAwMCBuIAowMDAwMDAwNzI5IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgOQovUm9vdCAxIDAgUgovSW5mbyA1IDAgUgovSURbPDY5ZjAzNzljMjZiM2FjYWU5YjQ3NGRhZDg0NmVhZDI5Pjw2OWYwMzc5YzI2YjNhY2FlOWI0NzRkYWQ4NDZlYWQyOT5dCj4+CnN0YXJ0eHJlZgo4MzgKJSVFT0YK"
        ];
    }
}
