<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepo
{
    public function createUser($data)
    {
        return  User::create($data);
    }
}
