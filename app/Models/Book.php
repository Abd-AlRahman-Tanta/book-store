<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ["book_name", "image", "price", "description"];





    public function users()
    {
        return $this->belongsToMany(User::class, "invoices")
            ->withPivot("price", "amount", "book_name")
            ->withTimestamps();
    }
}
