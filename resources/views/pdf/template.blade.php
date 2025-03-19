<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Order Receipt</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; color: #333; }
        .order-details { margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        table, th, td { border: 1px solid black; padding: 10px; text-align: left; }
    </style>
</head>
<body>
    <h1>Order Confirmation</h1>
    <p>Thank you, {{ $order['firstName'] }} {{ $order['lastName'] }}!</p>
    <p>Email: {{ $order['email'] }}</p>
    <p>Phone: {{ $order['phone'] }}</p>
    <p>Address: {{ $order['address'] }}, {{ $order['city'] }}, {{ $order['zipCode'] }}</p>

    <div class="order-details">
        <h2>Order Details</h2>
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            @foreach($order['cartItems'] as $item)
                <tr>
                    <td>{{ $item['name'] }}</td>
                    <td>{{ $item['quantity'] }}</td>
                    <td>{{ $item['price'] }}</td>
                </tr>
            @endforeach
        </table>
    </div>

    <h3>Total Amount: {{ $order['total'] }} DH</h3>
</body>
</html>
