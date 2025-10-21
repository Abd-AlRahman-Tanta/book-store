<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user =  Auth::user();
        return [
            ...parent::share($request),
            //
            "flash" => [
                "success" => $request->session()->get("success"),
                "error" => $request->session()->get("error")
            ],
            "user" => $user != null ? [
                "user_name" => $user["user_name"],
                "id" => $user["id"],
                "email" => $user["email"],
                "role" => $user["role"]
            ] : null
        ];
    }
}
