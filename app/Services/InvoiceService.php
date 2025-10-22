<?php

namespace App\Services;

use App\Repositories\InvoiceRepo;

class InvoiceService
{
    protected $invoiceRepo;

    public function __construct(InvoiceRepo $invoiceRepo)
    {
        $this->invoiceRepo = $invoiceRepo;
    }
    public function handleAddInvoice($req)
    {
        $req->validate([
            "invoices" => "required|array|min:1",
            "invoices.*.book_id" => "required|exists:books,id",
            "invoices.*.book_name" => "required|string",
            "invoices.*.price" => "required|string",
            "invoices.*.amount" => "required|min:1"
        ]);
        $syncedData = [];
        foreach ($req["invoices"] as $book) {
            $syncedData[$book["book_id"]] = [
                "price" => $book["price"],
                "amount" => $book["amount"],
                "book_name" => $book["book_name"]
            ];
        }
        return $this->invoiceRepo->addInvoice($syncedData);
    }

    public function handleShowInvoices()
    {
        $invoices = $this->invoiceRepo->getAllInvoices();
        $data = $invoices->groupBy(fn($b) => $b->created_at->format("Y-m-d-h:i:s A"));
        return $data;
    }
}
