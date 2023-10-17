<?php

namespace Database\Seeders;

use App\Models\V1\Pdf;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PdfSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pdf::factory()->count(5)->create();
    }
}
