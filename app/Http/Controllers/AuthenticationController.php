<?php

namespace App\Http\Controllers;

use App\Models\User;
use Dotenv\Exception\ValidationException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException as ValidationValidationException;
use Inertia\Inertia;
use League\Config\Exception\ValidationException as ExceptionValidationException;
use Throwable;

class AuthenticationController extends Controller
{
    public function registerPage()
    {

        return Inertia::render("Register", [
            "inputs" => [
                ["name" => "user_name", "type" => "text", "placeHolder" => "Name"],
                ["name" => "email", "type" => "email", "placeHolder" => "Email"],
                ["name" => "password", "type" => "password", "placeHolder" => "Password"],
                ["name" => "password_confirmation", "type" => "password", "placeHolder" => "Password_Confirmation"],
            ]
        ]);
    }





    public function loginPage()
    {
        return Inertia::render("Login", [
            "inputs" => [
                ["name" => "email", "type" => "email", "placeHolder" => "Email"],
                ["name" => "password", "type" => "password", "placeHolder" => "Password"]
            ],
        ]);
    }








    public function register(Request $req)
    {
        try {
            $validated = $req->validate([
                "user_name" => "required|string",
                "email" => "required|email|unique:users,email",
                "password" => "required|string|confirmed|min:8"
            ]);
            $user = User::create([
                "user_name" => $validated["user_name"],
                "email" => $validated["email"],
                "password" => Hash::make($validated["password"]),
            ]);
            Auth::login($user);
            $req->session()->regenerate();
            return redirect("/home")->with("success", "Registered Successfully!");
        } catch (Exception $e) {
            /** @var \Illuminate\Validation\ValidationException $e */
            $errors = collect($e->errors())->flatten();
            return redirect()->back()->with('error', $errors);
        }
    }

    public function login(Request $req)
    {
        try {
            $req->validate([
                "email" => "required|email",
                "password" => "required|string"
            ]);
            if (!Auth::attempt($req->only("email", "password"))) {
                return redirect()->back()->with("error", ["invalid Email or Password!"]);
            }
            return redirect("/home")->with("success", "Login Successfully!");
        } catch (Exception $e) {
            /** @var \Illuminate\Validation\ValidationException $e */
            $errors = collect($e->errors())->flatten();
            return redirect()->back()->with('error', $errors);
        }
    }
    public function logout(Request $req)
    {
        Auth::logout();
        $req->session()->invalidate();
        $req->session()->regenerate();
        return redirect("/login")->with("success", "Logout Successfully!");
    }
}
