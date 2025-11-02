<?php

namespace App\Repositories;

use App\Models\Book;

class BooksRepo
{

    public function addBook($data)
    {
        return Book::create($data);
    }

    public function getBook($id)
    {
        return Book::find($id);
    }
    public function editBook($editedBook, $id)
    {
        return Book::find($id)->update($editedBook);
    }
    public function deleteBook($req)
    {
        return Book::find($req["id"])->delete();
    }
    public function getLatestBooks($n)
    {
        return $n != "all" ? Book::latest()->paginate($n) : Book::all();
    }
    public function onlyTrashed()
    {
        return Book::onlyTrashed()->get();
    }
    public function restoreBook($id)
    {
        return Book::onlyTrashed()->find($id)->restore();
    }
    public function finalDelete($id)
    {
        Book::onlyTrashed()->find($id)->forceDelete();
    }
}
