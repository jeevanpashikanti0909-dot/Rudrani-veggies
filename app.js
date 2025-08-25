import React, { useState } from "react";
import "./styles.css";

function App() {
  const [cart, setCart] = useState([]);
  const products = [
    { name: "Tomato", price: 40 },
    { name: "Potato", price: 30 },
    { name: "Onion", price: 35 }
  ];

  const addToCart = (item) => setCart([...cart, item]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const checkout = async () => {
    // Call backend to create Razorpay order
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total })
    });
    const order = await res.json();

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: order.amount,
      currency: "INR",
      name: "Rudrani Veggies",
      description: "Vegetable Order",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful!");
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h1>🥕 Rudrani Veggies</h1>
      <div className="products">
        {products.map((p, i) => (
          <div key={i}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h2>Cart</h2>
      <ul>
        {cart.map((c, i) => <li key={i}>{c.name} - ₹{c.price}</li>)}
      </ul>
      <p>Total: ₹{total}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default App;
