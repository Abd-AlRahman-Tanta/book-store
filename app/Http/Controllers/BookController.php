<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\InvoiceModel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class BookController extends Controller
{
    public function bookStore()
    {
        return Inertia::render("Store", [
            "books" => Book::latest()->paginate(6),
            "allBooks" => Book::all()
        ]);
    }



    public function showCartPage()
    {
        return Inertia::render("CartPage");
    }



    public function  addInvoice(Request $req)
    {
        try {
            $validated = $req->validate([
                "invoices" => "required|array|min:1",
                "invoices.*.book_id" => "required|exists:books,id",
                "invoices.*.book_name" => "required|string",
                "invoices.*.amount" => "required|min:1",
                "invoices.*.price" => "required"
            ]);
            $user = Auth::user();
            $syncedData = [];
            foreach ($validated["invoices"] as $book) {
                $syncedData[$book["book_id"]] = ["amount" => $book["amount"], "price" => $book["price"], "book_name" => $book["book_name"]];
            }
            $user->books()->attach($syncedData);
            return redirect("/home")->with("success", "Request Sent Successfully!");
        } catch (Exception $e) {
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
    public function showInvoices()
    {
        try {
            $user = Auth::user();
            $userBooks = InvoiceModel::where("user_id", $user["id"])->get();
            $myReq = $userBooks->groupBy(fn($b) => $b->created_at->format("Y-m-d-h:i:s A"));
            return Inertia::render("Invoices", ["invoices" => $myReq]);
        } catch (Exception $e) {
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }


    public function showEditBookPage($id)
    {
        $book = Book::find($id);
        return inertia("Product", ["book" => $book]);
    }
    public function showAddBookPage()
    {
        return inertia("Product");
    }
    public function addBook(Request $req)
    {
        try {
            $validated = $req->validate([
                "book_name" => "required|string",
                "description" => "required|string",
                "price" => "required|string",
                "image" => "required|image|mimes:png,jpg,jpeg"
            ]);
            if ($req->hasFile("image")) {
                $path = $req->file("image")->store("books-images", "public");
                $validated["image"] = $path;
                Book::create([
                    "book_name" => $validated["book_name"],
                    "description" => $validated["description"],
                    "price" => $validated["price"],
                    "image" => $validated["image"]
                ]);
                return redirect("/home")->with("success", "Book Added Successfully!");
            } else {
                return redirect()->back()->with("error", "Image is Required!");
            }
        } catch (ValidationException $e) {
            $errors = collect($e->errors())->flatten();
            return redirect()->back()->with("error", $errors);
        } catch (Exception $e) {
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
    public function editBook(Request $req, $id)
    {
        try {
            $validated = $req->validate([
                "book_name" => "required|string",
                "description" => "required|string",
                "price" => "required|string",
                "image" => "sometimes|image|mimes:png,jpg,jpeg"
            ]);
            $book = Book::find($id);
            if ($req->hasFile("image")) {
                Storage::disk("public")->delete($book["image"]);
                $path = $req->file("image")->store("books-images", "public");
                $validated["image"] = $path;
            } else {
                $validated["image"] = $book["image"];
            }
            $book->update($validated);
            return redirect("/home")->with("success", "Book Edited Successfully!");
        } catch (ValidationException $e) {
            $errors = collect($e->errors())->flatten();
            return redirect()->back()->with("error", $errors);
        } catch (Exception $e) {
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
    public function deleteBook(Request $req)
    {
        try {
            $validated = $req->validate([
                "id" => "required"
            ]);
            $book = Book::find($validated["id"]);
            $book->delete();
            return redirect("/home")->with("success", "Book Has Been Deleted!");
        } catch (Exception $e) {
            /** @var \Illuminate\Validation\ValidationException $e */
            $errors = collect($e->errors())->flatten();
            redirect()->back()->with("error", $errors);
        }
    }
}
