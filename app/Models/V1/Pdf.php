<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Traits\Tappable;
use App\Models\User;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pdf extends Model
{
    use HasFactory;
    use Tappable;
    use SoftDeletes;

    protected $fillable = [
        "users_id",
        "name",
        "content",
        "deleted_at"
    ];

    public function user() {
        return $this->belongsTo(
            User::class,
            "users_id"
        );
    }
}
