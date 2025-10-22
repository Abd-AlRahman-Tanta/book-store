<?php

namespace App\Repositories;

use App\Models\InvoiceModel;
use Illuminate\Support\Facades\Auth;

class InvoiceRepo
{
    public function addInvoice($data)
    {
        return Auth::user()->books()->attach($data);
    }
    public function getAllInvoices()
    {
        return InvoiceModel::where("user_id", Auth::user()["id"])->get();
    }
}
