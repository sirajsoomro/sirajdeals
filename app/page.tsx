// "use client"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import firebase from "firebase/compat/app"


// import { useState, useEffect, useMemo } from "react"

// interface Product {
//   id: number
//   name: string
//   description: string
//   price: number
//   imgSrc: string
// }

// const NavbarAndProducts = () => {
//   const router = useRouter()
//   const [searchQuery, setSearchQuery] = useState<string>("")
//   const [cartItems, setCartItems] = useState<Product[]>([])
//   const [showCart, setShowCart] = useState<boolean>(false)
//   const [showCheckoutForm, setShowCheckoutForm] = useState<boolean>(false)

//   const DELIVERY_CHARGE = 200

//   const products: Product[] = [
//     {
//       id: 1, name: "Mens Loaffers", description: "Mens Loaffers  :-  / -", price: 1750, imgSrc: "/shoes.jpg"
//     },
//     { id: 2, name: "Bluetooth Speaker", description: "Portable speaker with bass boost", price: 1000, imgSrc: "/watch.png" },
//     { id: 3, name: "Smart Watch", description: "Track your fitness in style", price: 1000, imgSrc: "/watch.png" },
//     { id: 4, name: "Gaming Mouse", description: "Ergonomic RGB mouse for gamers", price: 1000, imgSrc: "/watch.png" },
//     { id: 5, name: "adil", description: "Extra long description for testing overflow and ellipsis", price: 5000, imgSrc: "/watch.png" },
//     { id: 6, name: "siraj", description: "Ergonomic RGB mouse for gamers", price: 1000, imgSrc: "/watch.png" },
//     { id: 7, name: "siraj", description: "Ergonomic RGB mouse for gamers", price: 1000, imgSrc: "/watch.png" },
//     { id: 8, name: "siraj", description: "Ergonomic RGB mouse for gamers", price: 1000, imgSrc: "/watch.png" },
//     { id: 9, name: "siraj", description: "Ergonomic RGB mouse for gamers", price: 1000, imgSrc: "/watch.png" },
//     { id: 10, name: "siraj", description: "Ergonomic RGB mouse for gamers", price: 1000, imgSrc: "/watch.png" },
//   ]

//   useEffect(() => {
//     const stored = localStorage.getItem("cartItems")
//     if (stored) setCartItems(JSON.parse(stored))
//   }, [])

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems))
//   }, [cartItems])

//   const filteredProducts = useMemo<Product[]>(() =>
//     products.filter((product) =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     , [searchQuery, products])

//   const addToCart = (product: Product) => setCartItems((prev) => [...prev, product])
//   const removeFromCart = (index: number) => {
//     const updated = [...cartItems]
//     updated.splice(index, 1)
//     setCartItems(updated)
//   }

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0)
//   const grandTotal = subtotal + DELIVERY_CHARGE

//   return (
//     <>
// <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
//   <div className="w-[95%] mx-auto flex flex-col sm:flex-row items-center justify-between p-3 gap-3 sm:gap-0">
//     {/* Left - Logo and Title */}
//     <div className="flex items-center gap-2">
//       <Image src="/logo.png" alt="Logo" width={36} height={56} className="h-14 w-9" />
//       <span className="text-3xl font-bold text-pink-600">SIRAJ DEALS</span>
//     </div>

//     {/* Right - Search and Button */}
//     <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
//       <input
//         type="text"
//         placeholder="Search products..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="textplace border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-white-500"
//       />
//       <button className="bg-blue-400 text-black px-4 py-2 rounded-lg hover:bg-gray-200 duration-300 ease-in w-full sm:w-auto">
//         Price Filter
//       </button>
//     </div>
//   </div>
// </nav>

// {/* 👇 Product Grid With Top Padding */}
// <div className="pt-28 w-full max-w-screen-xl m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-14 px-6">
//   {filteredProducts.map((product) => (
//     <div
//       key={product.id}
//       className="box max-w-xs h-full rounded-xl p-6 bg-[#3A222F] shadow-md border-none flex flex-col"
//     >
//       <div className="flex-grow">
//         <div className="flex justify-center mb-4">
//           <div className="w-[180px] h-[180px] relative">
//             <Image
//               src={product.imgSrc}
//               alt={product.name}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-md"
//             />
//           </div>
//         </div>
//         <h2 className="text-white font-bold text-lg text-center">{product.name}</h2>
//         <p className="text-sm text-gray-100 text-center mt-2 line-clamp-2">{product.description}</p>
//         <p className="text-orange-500 font-bold text-lg mt-2 text-center">PKR: {product.price}</p>
//       </div>

//       <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
//         <Link
//           href={`/product/${encodeURIComponent(product.name)}_${product.price}_${encodeURIComponent(
//             product.description
//           )}_${encodeURIComponent(product.imgSrc)}`}
//           className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-700 duration-300 ease-in text-center w-full sm:w-auto"
//         >
//           Details
//         </Link>
//         <button
//           onClick={() => addToCart(product)}
//           className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-gray-700 w-full sm:w-auto"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   ))}
// </div>

//       <button
//         onClick={() => setShowCart(true)}
//         className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-3 rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300">
//         <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24">
//           <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45C7.16 17.37 7 17.68 7 18a2 2 0 1 0 2 2h8a2 2 0 1 0 2-2c0-.32-.16-.63-.25-.96l-1.1-2.04H9.42l.93-1.66h7.45a1 1 0 0 0 .92-.63l3.24-7.24A1 1 0 0 0 21 4H7z" />
//         </svg>
//         <span className="font-bold">VIEW CART</span>
//         {cartItems.length > 0 && (
//           <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-yellow-300 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
//             {cartItems.length}
//           </span>
//         )}
//       </button>
//       <div className={`fixed top-0 right-0 h-full w-full sm:w-[350px] bg-white shadow-lg z-50 p-6 overflow-y-auto transition-transform duration-300 ${showCart ? "translate-x-0" : "translate-x-full"}`}>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Your Cart</h2>
//           <button onClick={() => setShowCart(false)} className="text-red-600 text-2xl">×</button>
//         </div>
//         {cartItems.length === 0 ? (
//           <p className="text-gray-600">Your cart is empty.</p>
//         ) : (
//           <>
//             <ul className="space-y-4">
//               {cartItems.map((item, idx) => (
//                 <li key={idx} className="flex items-center gap-3 border-b pb-3">
//                   <Image src={item.imgSrc} alt={item.name} width={50} height={50} className="rounded-md object-cover w-14 h-14" />
//                   <div className="flex-1">
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-600">PKR {item.price}</p>
//                   </div>
//                   <button onClick={() => removeFromCart(idx)} className="text-red-500 hover:underline">Remove</button>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-6 border-t pt-4 space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-700">Subtotal:</span>
//                 <span className="font-medium">PKR {subtotal}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-700">Delivery:</span>
//                 <span className="font-medium">PKR {DELIVERY_CHARGE}</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold border-t pt-2">
//                 <span>Total:</span>
//                 <span>PKR {grandTotal}</span>
//               </div>
//             </div>
//             <button
//               className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
//               onClick={() => {
//                 setShowCheckoutForm(true)
//                 setShowCart(false)
//               }}>Proceed to Checkout</button>
//           </>
//         )}
//       </div>
//       {showCheckoutForm && (
//         <>
//           <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"></div>
//           <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
//             <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative animate-fadeIn">
//               <button onClick={() => setShowCheckoutForm(false)} className="absolute top-3 right-3 text-gray-500 text-xl font-bold hover:text-red-500">×</button>
//               <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>


//               <form
//                 onSubmit={async (e) => {
//                   e.preventDefault();
//                   const form = e.target as HTMLFormElement;
//                   const formData = new FormData(form);

//                   const order = {
//                     name: formData.get("name"),
//                     email: formData.get("email"),
//                     phone: formData.get("phone"),
//                     city: formData.get("city"),
//                     address: formData.get("address"),
//                     cartItems,
//                     subtotal,
//                     delivery: DELIVERY_CHARGE,
//                     total: grandTotal,
//                   };

//                   try {
//                     const res = await fetch("/api/send-order", {
//                       method: "POST",
//                       headers: { "Content-Type": "application/json" },
//                       body: JSON.stringify(order),
//                     });

//                     if (res.ok) {
//                       alert("Order place hogaya aur email send hogayi!");
//                       setShowCheckoutForm(false);
//                       setCartItems([]);
//                       localStorage.removeItem("cartItems");
//                     } else {
//                       alert("Email bhejne mein masla aya.");
//                     }
//                   } catch (error) {
//                     console.error("Email error:", error);
//                     alert("Kuch ghalat hogaya. Try again.");
//                   }
//                 }}
//                 className="space-y-4"
//               >
//                 <input name="name" type="text" placeholder="Full Name" required className="w-full border border-gray-300 p-2 rounded" />
//                 <input name="email" type="email" placeholder="Email Address" required className="w-full border border-gray-300 p-2 rounded" />
//                 <input name="phone" type="tel" placeholder="Phone Number" required className="w-full border border-gray-300 p-2 rounded" />
//                 <input name="city" type="text" placeholder="City" required className="w-full border border-gray-300 p-2 rounded" />
//                 <textarea name="address" placeholder="Full Address" required className="w-full border border-gray-300 p-2 rounded" rows={3}></textarea>
//                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">Submit Order</button>
//               </form>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   )
// }

// export default NavbarAndProducts

"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Product {
  id: string
  name: string
  description: string
  price: number
  imgSrc: string
}

const NavbarAndProducts = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  const DELIVERY_CHARGE = 200

  useEffect(() => {
    const stored = localStorage.getItem("cartItems")
    if (stored) setCartItems(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"))
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }))
      setProducts(list)
    }
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, products])

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product])
  }

  const removeFromCart = (index: number) => {
    const updated = [...cartItems]
    updated.splice(index, 1)
    setCartItems(updated)
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0)
  const grandTotal = subtotal + DELIVERY_CHARGE

  const handleCheckout = () => {
    setShowCheckoutForm(true)
    setShowCart(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="w-[95%] mx-auto flex flex-col sm:flex-row items-center justify-between p-3 gap-3 sm:gap-0">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={36} height={56} className="h-14 w-9" />
            <span className="text-3xl font-bold text-pink-600">SIRAJ DEALS</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="textplace border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-white-500"
            />
            <button className="bg-blue-400 text-black px-4 py-3 rounded-lg hover:bg-gray-200 duration-300 ease-in w-full sm:w-auto">
              Price Filter
            </button>
          </div>
        </div>
      </nav>


      <div className="pt-28 w-full max-w-screen-xl m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-14 px-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="max-w-xs h-full rounded-xl p-6 bg-[#3A222F] shadow-lg border-none flex flex-col"
          >
            <div className="flex-grow">
              <div className="flex justify-center mb-4">
                <div className="w-[180px] h-[180px] relative">
                  {product.imgSrc ? (
                    <Image
                      src={product.imgSrc}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded-md">
                      No Image
                    </div>
                  )}

                </div>
              </div>
              <h2 className="text-white font-bold text-lg text-center">{product.name}</h2>
              <p className="text-sm text-gray-100 text-center mt-2 line-clamp-2">{product.description}</p>
              <p className="text-orange-400 font-bold text-lg mt-2 text-center">PKR: {product.price}</p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
              <Link
                href={`/product/${encodeURIComponent(product.name)}_${product.price}_${encodeURIComponent(product.description)}_${encodeURIComponent(product.imgSrc)}`}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto text-center"
              >
                Details
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-3 rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24">
          <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45C7.16 17.37 7 17.68 7 18a2 2 0 1 0 2 2h8a2 2 0 1 0 2-2c0-.32-.16-.63-.25-.96l-1.1-2.04H9.42l.93-1.66h7.45a1 1 0 0 0 .92-.63l3.24-7.24A1 1 0 0 0 21 4H7z" />
        </svg>
        <span className="font-bold">VIEW CART</span>
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-yellow-300 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
            {cartItems.length}
          </span>
        )}
      </button>

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[350px] bg-white shadow-lg z-50 p-6 overflow-y-auto transition-transform duration-300 ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={() => setShowCart(false)} className="text-red-600 text-2xl">×</button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 border-b pb-3">
                  {item.imgSrc ? (
                    <Image
                      src={item.imgSrc}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover w-14 h-14"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 rounded-md">
                      No Image
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">PKR {item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(idx)} className="text-red-500 hover:underline">Remove</button>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-medium">PKR {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Delivery:</span>
                <span className="font-medium">PKR {DELIVERY_CHARGE}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>PKR {grandTotal}</span>
              </div>
            </div>
            <button
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
              onClick={() => {
                setShowCheckoutForm(true);
                setShowCart(false);
              }}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>

      {showCheckoutForm && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"></div>
          <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md relative animate-fadeIn">
              <button onClick={() => setShowCheckoutForm(false)} className="absolute top-3 right-3 text-gray-500 text-xl font-bold hover:text-red-500">×</button>
              <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
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
                <input name="name" type="text" placeholder="Full Name" required className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input name="email" type="email" placeholder="Email Address" required className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input name="phone" type="tel" placeholder="Phone Number" required className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input name="city" type="text" placeholder="City" required className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <textarea name="address" placeholder="Full Address" required rows={3} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NavbarAndProducts
