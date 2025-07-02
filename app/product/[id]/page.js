'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from "next/image";


export default function ProductPage() {
  const { id } = useParams();
  const [rawName, rawPrice, rawDescription, rawImgSrc] = id ? id.split('_') : ["", "", "", ""];
  const name = decodeURIComponent(rawName);
  const price = Number(rawPrice);
  const description = decodeURIComponent(rawDescription);
  const imgSrc = decodeURIComponent(rawImgSrc);

  const [quantity, setQuantity] = useState(1);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const DELIVERY_CHARGE = 300;
  const subtotal = price * quantity;
  const grandTotal = subtotal + DELIVERY_CHARGE;

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems([
      {
        name,
        price,
        quantity,
        total: price * quantity,
        image: imgSrc,
      }
    ]);
  }, [name, price, quantity, imgSrc]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden break-words w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full bg-[#3A222F] rounded-2xl p-8 shadow-xl">
          <div className="w-full h-[400px] relative">
            <Image
              src={imgSrc}
              alt={name}
              fill
              className="object-contain rounded"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold text-white">{name}</h1>
            <p className="text-orange-500 text-2xl font-semibold">PKR {price}</p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg max-w-full sm:max-w-md">{description}</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center border rounded-full px-3 py-1">
                <button onClick={decrement} className="text-xl px-2 text-white">−</button>
                <span className="px-3 text-white">{quantity}</span>
                <button onClick={increment} className="text-xl px-2 text-white">+</button>
              </div>
              <button
                onClick={() => alert(`Added ${quantity} item(s) to cart`)}
                className="flex items-center gap-2 bg-indigo-100 text-indigo-700 font-medium px-5 py-2 rounded-full hover:bg-indigo-200 transition"
              >Add to cart</button>
            </div>
            <button
              onClick={() => setShowCheckoutForm(true)}
              className="w-full bg-indigo-600 text-white py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition"
            >Buy Now</button>
          </div>
        </div>
      </div>

      {showCheckoutForm && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setShowCheckoutForm(false)}></div>
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative">
              <button onClick={() => setShowCheckoutForm(false)} className="absolute top-3 right-3 text-gray-500 text-xl font-bold hover:text-red-500">×</button>
              <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const formData = new FormData(form);

                  const order = {
                    name: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
                    city: formData.get("city"),
                    address: formData.get("address"),
                    cartItems,
                    subtotal,
                    delivery: DELIVERY_CHARGE,
                    total: grandTotal,
                  };

                  try {
                    const res = await fetch("/api/send-order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(order),
                    });

                    if (res.ok) {
                      alert("Order place hogaya aur email send hogayi!");
                      setShowCheckoutForm(false);
                      setCartItems([]);
                      localStorage.removeItem("cartItems");
                    } else {
                      alert("Email bhejne mein masla aya.");
                    }
                  } catch (error) {
                    console.error("Email error:", error);
                    alert("Kuch ghalat hogaya. Try again.");
                  }
                }}
                className="space-y-4"
              >
                <input name="name" type="text" placeholder="Full Name" required className="w-full border border-gray-300 p-2 rounded" />
                <input name="email" type="email" placeholder="Email Address" required className="w-full border border-gray-300 p-2 rounded" />
                <input name="phone" type="tel" placeholder="Phone Number" required className="w-full border border-gray-300 p-2 rounded" />
                <input name="city" type="text" placeholder="City" required className="w-full border border-gray-300 p-2 rounded" />
                <textarea name="address" placeholder="Full Address" required className="w-full border border-gray-300 p-2 rounded" rows={3}></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">Submit Order</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
