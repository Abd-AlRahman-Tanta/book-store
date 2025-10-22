<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\InvoicesController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthenticationController::class)->group(function () {
    Route::get("/", "registerPage")->middleware("checkNotAuth");
    Route::get("/login", "loginPage")->middleware("checkNotAuth");
    Route::post("/register", "register");
    Route::post("/login", "login");
    Route::delete("/logout", "logout")->middleware("checkAuth");
});



Route::controller(BookController::class)->group(function () {
    Route::middleware("checkAuth")->group(function () {
        Route::get("/home", "bookStore");
    });
    Route::middleware("checkIfAdmin")->group(function () {
        Route::delete("/deleteBook", "deleteBook");
        Route::get("/editBook/{id}", "showEditBookPage");
        Route::get("/addBook", "showAddBookPage");
        Route::post("/addBook", "addBook");
        Route::put("/editBook/{id}", "editBook");
    });
});
Route::controller(InvoicesController::class)->group(function () {
    Route::middleware("checkAuth")->group(function () {
        Route::get("/cart", "showCartPage");
        Route::post("/invoice", "addInvoice");
        Route::get("/showInvoices", "showInvoices");
    });
});
