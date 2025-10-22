<?php

namespace App\Http\Controllers;

use App\Services\InvoiceService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoicesController extends Controller
{
    protected $invoiceService;

    public function __construct(InvoiceService $invoiceService)
    {
        $this->invoiceService = $invoiceService;
    }


    public function showCartPage()
    {
        return Inertia::render("CartPage");
    }

    public function  addInvoice(Request $req)
    {
        try {
            $this->invoiceService->handleAddInvoice($req);
            return redirect("/home")->with("success", "Request Sent Successfully!");
        } catch (Exception $e) {
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
    public function showInvoices()
    {
        try {
            return Inertia::render("Invoices", ["invoices" => $this->invoiceService->handleShowInvoices()]);
        } catch (Exception $e) {
            return redirect()->back()->with("error", [$e->getMessage()]);
        }
    }
}
