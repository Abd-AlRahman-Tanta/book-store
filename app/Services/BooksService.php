<?php

namespace App\Services;

use App\Repositories\BooksRepo;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BooksService
{
    protected $bookRepo;

    public function __construct(BooksRepo $bookRepo)
    {
        $this->bookRepo = $bookRepo;
    }

    public function handleAddBookData($data)
    {
        $data->validate([
            "book_name" => "required|string",
            "price" => "required|string",
            "description" => "required|string",
            "image" => "required|image|mimes:png,jpg,jpeg"
        ]);
        if ($data->hasFile("image")) {
            $path = $data->file("image")->store("books-images", "public");
            $data["image"] = $path;
        }
        $sentData = [
            "book_name" => $data["book_name"],
            "price" => $data["price"],
            "description" => $data["description"],
            "image" => $path
        ];
        return $this->bookRepo->addBook($sentData);
    }


    public function handleEditBook($req, $id)
    {
        $req->validate([
            "book_name" => "required|string",
            "price" => "required|string",
            "description" => "required|string",
            "image" => "sometimes|image|mimes:png,jpg,jpeg"
        ]);
        $path = "";
        if ($req->hasFile("image")) {
            Storage::disk("public")->delete($this->bookRepo->getBook($id)["image"]);
            $path = $req->file("image")->store("books-images", "public");
        } else {
            $path = $this->bookRepo->getBook($id)["image"];
        }
        $sentData = [
            "book_name" => $req["book_name"],
            "price" => $req["price"],
            "description" => $req["description"],
            "image" => $path
        ];
        return $this->bookRepo->editBook($sentData, $id);
    }
    public function handleDeleteBook($req)
    {
        $req->validate([
            "id" => "required"
        ]);
        return $this->bookRepo->deleteBook($req);
    }
    public function handleGetTrashedBook()
    {
        return $this->bookRepo->onlyTrashed();
    }
    public function handleRestoreBook($id)
    {
        return $this->bookRepo->restoreBook($id);
    }

    public function handleGetBook($id)
    {
        Log::info("send request to book repo for restore book");
        return  $this->bookRepo->getBook($id);
    }
    public function handleForceDelete($id)
    {
        Log::info("send request to book repo for restore book");
        return  $this->bookRepo->finalDelete($id);
    }



    public function handleGetLatestBooks($n)
    {
        return  $this->bookRepo->getLatestBooks($n);
    }
}
