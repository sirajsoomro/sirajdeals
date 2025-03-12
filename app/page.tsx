"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const NavbarAndProducts = () => {
  const router = useRouter()

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless ",
      price: 99.99,
      imgSrc: "/watch.png",
    },
    {
      id: 2,
      name: "Smartwatch",
      description: "Feature-packed smartwatch ",
      price: 149.99,
      imgSrc: "/watch.png",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with deep bass and 10-hour battery life.",
      price: 59.99,
      imgSrc: "/watch.png",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      description: "Ergonomic gaming mouse with RGB lighting and customizable buttons.",
      price: 39.99,
      imgSrc: "/watch.png",
    }
  ]

  return (
    <>
      <nav className="w-[95%] m-auto flex flex-wrap items-center justify-between p-3">
        <div className="flex items-center gap-2 ml-8">
          <Image src="/logo.png" alt="Logo" width={36} height={56} className="h-14 w-9" />
          <span className="text-3xl font-bold text-pink-600">SIRAJ DEALS</span>
        </div>
        <div className="flex flex-wrap mr-16 sm:flex-nowrap w-full sm:w-auto gap-2 mt-2 sm:mt-0">
          <input
            type="text"
            placeholder="Search products..."
            className="textplace border border-gray-300 rounded-lg px-3 py-2 text-sm flex-grow sm:w-64 focus:outline-none focus:ring-2 focus:ring-white-500"
          />
          <button className="bg-blue-400 text-black px-4 py-2 rounded-lg hover:bg-gray-200 duration-300 ease-in">
            Price Filter
          </button>
        </div>
      </nav>

      <div className="w-[85%] m-auto grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-14">
        {products.map((product) => (
          <div  key={product.id} className="rounded-xl p-4 w-full sm:w-72 md:w-80 lg:w-96 bg-[#3A222F] shadow-[0_8px_10px_rgba(155,129,129,0.1)]">
            <div className="flex justify-center gap-x-2.5">
              <Image
                src={product.imgSrc || "/placeholder.svg"}
                alt={product.name}
                width={160}
                height={160}
                className="m-auto w-40 h-40 object-cover rounded-md"
              />
            </div>
            <h2 className="text-white font-bold text-lg mt-3 text-center">{product.name}</h2>
            <p className="text-sm text-gray-100 text-center mt-2">{product.description}</p>
            <p className="text-orange-500 font-bold text-lg mt-2 text-center">PKR : {product.price}</p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-3">
              <Link href={`/product/${encodeURIComponent(product.name)}_${product.price}_${encodeURIComponent(product.description)}_${encodeURIComponent(product.imgSrc)}`}className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-700 duration-300 ease-in text-center w-full sm:w-auto">Details</Link>
              <button className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-gray-700 duration-300 ease-in w-full sm:w-auto">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default NavbarAndProducts

