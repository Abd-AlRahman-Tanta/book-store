<?php

namespace App\Http\Controllers;


use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException as ValidationValidationException;
use Inertia\Inertia;


class AuthenticationController extends Controller
{

    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function registerPage()
    {

        try {
            Log::info("tart egister");
            return Inertia::render("Register", [
                "inputs" => [
                    ["name" => "user_name", "type" => "text", "placeHolder" => "Name"],
                    ["name" => "email", "type" => "email", "placeHolder" => "Email"],
                    ["name" => "password", "type" => "password", "placeHolder" => "Password"],
                    ["name" => "password_confirmation", "type" => "password", "placeHolder" => "Password_Confirmation"],
                ]
            ]);
        } catch (\Exception $e) {
            Log::error("error", $e->getMessage());
        }
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
            $this->userService->handleUserRegisterData($req);
            return redirect("/home")->with("success", "Registered Successfully!");
        } catch (ValidationValidationException $e) {
            return redirect()->back()->with('error', collect($e->errors())->flatten());
        }
    }

    public function login(Request $req)
    {

        try {
            return
                $this->userService->handleUserLogin($req) ?
                redirect("/home")->with("success", "Login Successfully!") :
                redirect()->back()->with("error", ["invalid Email or Password!"]);
        } catch (ValidationValidationException $e) {
            return redirect()->back()->with('error', collect($e->errors())->flatten());
        }
    }
    public function logout(Request $req)
    {
        try {
            $this->userService->handleUserLogout($req);
            return redirect("/login")->with("success", "Logout Successfully!");
        } catch (Exception $e) {
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
}
