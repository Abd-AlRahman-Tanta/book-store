<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = ["book_name", "image", "price", "description"];





    public function users()
    {
        return $this->belongsToMany(User::class, "invoices")
            ->withPivot("price", "amount", "book_name")
            ->withTimestamps();
    }
}
