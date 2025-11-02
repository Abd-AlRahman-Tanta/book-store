<?php

namespace App\Http\Controllers;


use App\Services\BooksService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
    public function onlyTrash()
    {
        try {
            Log::info("start get trashed books from book controller");
            return Inertia::render("TrashedBook", ["books" => $this->bookService->handleGetTrashedBook()]);
            Log::info("got all trashed", $this->bookService->handleGetTrashedBook());
        } catch (\Exception $e) {
            Log::error("error", $e->getMessage());
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
    public function restore($id)
    {
        try {
            Log::info("start restore trashed book from trashe page");
            $this->bookService->handleRestoreBook($id);
            return redirect("/home")->with("success", "book restored successfully!");
        } catch (\Exception $e) {
            Log::error("error", $e->getMessage());
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
    public function forceDelete($id)
    {
        try {
            Log::info("start forceDelete");
            $this->bookService->handleForceDelete($id);
            return redirect("/home")->with("success", "book forced to delete successfully!");
        } catch (\Exception $e) {
            Log::error("error", $e->getMessage());
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
}
