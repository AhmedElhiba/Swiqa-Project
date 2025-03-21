<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #F0F8FF;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            width: 100%;
            max-width: 900px;
            background: #FFF;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
            text-align: center;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #4B8B3B;
            color: #FFF;
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
        .swiqa-text {
            font-family: 'Pacifico', cursive;
            font-size: 3rem;
            color: #FFF;
            margin: 0;
            text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
        }
        .header h1 {
            font-size: 2.2rem;
            margin: 0;
            color: #F5F5F5;
        }
        .header p {
            margin: 5px 0;
            font-size: 1.1rem;
            color: #E0E0E0;
        }
        .customer-info, .order-details {
            margin-bottom: 40px;
            padding: 0 15px;
            text-align: left;
        }
        .customer-info h2, .order-details h2 {
            font-size: 1.5rem;
            color: #4B8B3B;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #4B8B3B;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #F0F0F0;
            font-weight: bold;
            color: #4B8B3B;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .totals {
            margin-top: 25px;
            text-align: right;
            font-weight: bold;
            font-size: 1.4rem;
            padding: 15px;
            background-color: #4B8B3B;
            color: #FFF;
            border-radius: 8px;
        }
        .footer {
            margin-top: 30px;
            margin-bottom: 0;
            padding-bottom: 30px;
            text-align: center;
            font-size: 1.1rem;
            color: #666;
        }
        .footer p {
            margin: 15px 0;
        }
        .qrcode-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
        }
        .qrcode-container img {
            width: 120px;
            height: 120px;
            border-radius: 8px;
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 768px) {
            .container {
                padding: 20px;
                max-width: 100%;
            }
            .header {
                flex-direction: column;
                text-align: center;
            }
            .swiqa-text {
                font-size: 2.5rem;
            }
            th, td {
                font-size: 0.9rem;
                padding: 8px 12px;
            }
        }
        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                max-width: 100%;
                padding: 15px;
            }
            .footer {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- Logo text -->
            <div class="swiqa-text">SWIQA</div>
            <div>
                <h1>Order Confirmation</h1>
                <p>Order #{{ $order->id }}</p>
                <p>Date: {{ $order->created_at->format('M d, Y') }}</p>
            </div>
        </div>

        <div class="customer-info">
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> {{ $order->first_name }} {{ $order->last_name }}</p>
            <p><strong>Email:</strong> {{ $order->email }}</p>
            <p><strong>Phone:</strong> {{ $order->phone }}</p>
            <p><strong>Address:</strong> {{ $order->address }}, {{ $order->city }}, {{ $order->zip_code }}</p>
        </div>
        <div class="order-details">
            <h2>Order Items</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->cart_items as $item)
                    <tr>
                        <td>{{ $item['name'] }}</td>
                        <td>{{ $item['quantity'] ?? 1 }}</td>
                        <td>{{ $item['price'] }}</td>
                        <td>
                            @php
                                $price = preg_replace('/[^0-9.]/', '', $item['price'] ?? '0');
                                $quantity = $item['quantity'] ?? 1;
                                echo number_format($price * $quantity, 2) . ' DH';
                            @endphp
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="totals">
                Total Amount: {{ number_format($order->total_amount, 2) }} DH
            </div>
        </div>

        <!-- <div class="qrcode-container">
            <img src="https://i.postimg.cc/FHthJZTr/frame.png" alt="QR Code">
        </div> -->

        <div class="footer">
            <p>Thank you for shopping with us!</p>
        </div>
    </div>
</body>
</html>
