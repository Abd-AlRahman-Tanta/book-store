<?php

namespace App\Services;

use App\Repositories\UserRepo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepo $repo)
    {
        $this->userRepository = $repo;
    }

    public function handleUserRegisterData($data)
    {
        $data->validate([
            "user_name" => "required|string",
            "email" => "required|email|unique:users,email",
            "password" => "required|string|confirmed|min:8"
        ]);
        $sendData = [
            "user_name" => $data["user_name"],
            "email" => $data["email"],
            "password" => Hash::make($data["password"])
        ];
        $user = $this->userRepository->createUser($sendData);
        Auth::login($user);
        $data->session()->regenerate();
    }


    public function handleUserLogout($req)
    {
        Auth::logout();
        $req->session()->invalidate();
        $req->session()->regenerate();
    }
    public function handleUserLogin($data)
    {
        $data->validate([
            "email" => "required|email",
            "password" => "required|string"
        ]);
        if (!Auth::attempt(["email" => $data["email"], "password" => $data["password"]])) {
            return false;
        }
        return true;
    }
}
