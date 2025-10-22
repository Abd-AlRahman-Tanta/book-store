<?php

namespace App\Http\Controllers;


use App\Services\BooksService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class BookController extends Controller
{
    protected $bookService;



    public function __construct(BooksService $bookService)
    {
        $this->bookService = $bookService;
    }


    public function bookStore()
    {
        return Inertia::render("Store", [
            "books" => $this->bookService->handleGetLatestBooks(6),
            "allBooks" => $this->bookService->handleGetLatestBooks("all")
        ]);
    }

    public function showEditBookPage($id)
    {
        return inertia("Product", ["book" => $this->bookService->handleGetBook($id)]);
    }
    public function showAddBookPage()
    {
        return inertia("Product");
    }



    public function addBook(Request $req)
    {
        try {
            $this->bookService->handleAddBookData($req);
            return redirect("/home")->with("success", "Book Added Successfully!");
        } catch (ValidationException $e) {
            return redirect()->back()->with("error", collect($e->errors())->flatten());
        } catch (Exception $e) {
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }



    public function editBook(Request $req, $id)
    {
        try {
            $this->bookService->handleEditBook($req, $id);
            return redirect("/home")->with("success", "Book Edited Successfully!");
        } catch (ValidationException $e) {
            return redirect()->back()->with("error", collect($e->errors())->flatten());
        } catch (Exception $e) {
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
    public function deleteBook(Request $req)
    {
        try {
            $this->bookService->handleDeleteBook($req);
            return redirect("/home")->with("success", "Book Has Been Deleted!");
        } catch (ValidationException $e) {
            redirect()->back()->with("error", collect($e->errors())->flatten());
        }
    }
}
