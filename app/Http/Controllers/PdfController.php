<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Response;

class PdfController extends Controller
{
    public function generatePdf(Request $request)
    {
        // Get order data from the request
        $orderData = $request->all();

        // Load the view with order details
        $pdf = Pdf::loadView('pdf.template', ['order' => $orderData]);

        // Return the PDF response for download
        return Response::make($pdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="order_ticket.pdf"',
        ]);
    }
}
