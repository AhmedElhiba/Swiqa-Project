<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use PDF;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'zipCode' => 'required|string|max:20',
            'cartItems' => 'required|array',
            'total' => 'required|numeric'
        ]);

        // Create a new order
        $order = Order::create([
            'first_name' => $validatedData['firstName'],
            'last_name' => $validatedData['lastName'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'city' => $validatedData['city'],
            'zip_code' => $validatedData['zipCode'],
            'total_amount' => $validatedData['total'],
            'cart_items' => $validatedData['cartItems'],
            'status' => 'pending'
        ]);

        // Generate PDF
        $pdf = $this->generatePdf($order);

        return response($pdf, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="order_ticket.pdf"');
    }

    private function generatePdf($order)
    {
        // Import the PDF facade or library
        $pdf = app('dompdf.wrapper');
        
        // Generate PDF content
        $content = view('pdf.order', compact('order'))->render();
        $pdf->loadHTML($content);
        
        return $pdf->output();
    }

    public function index()
    {
        $orders = Order::orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);
        return response()->json($order);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return response()->json($order);
    }
}