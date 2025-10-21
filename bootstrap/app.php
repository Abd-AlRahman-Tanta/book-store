<?php

use App\Http\Middleware\Authenticated;
use App\Http\Middleware\CheckIfAdmin;
use App\Http\Middleware\CheckIFAuth;
use App\Http\Middleware\CheckIfNotAuth;
use App\Http\Middleware\CheckToken;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\NoCache;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
        $middleware->alias([
            "checkAuth"  => CheckIFAuth::class,
            "checkNotAuth" => CheckIfNotAuth::class,
            "checkIfAdmin" => CheckIfAdmin::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
