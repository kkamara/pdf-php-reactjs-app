<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Traits\Tappable;
use App\Models\User;

class Pdf extends Model
{
    use HasFactory;
    use Tappable;

    protected $fillable = [
        "users_id",
        "name",
        "content"
    ];

    public function user() {
        return $this->belongsTo(
            User::class,
            "users_id"
        );
    }
}
