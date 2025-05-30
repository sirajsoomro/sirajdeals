"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useMemo } from "react"

const NavbarAndProducts = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless sound experience",
      price: 1000,
      imgSrc: "/watch.png",
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      description: "Portable speaker with bass boost",
      price: 1000,
      imgSrc: "/watch.png",
    },
    {
      id: 3,
      name: "Smart Watch",
      description: "Track your fitness in style",
      price: 1000,
      imgSrc: "/watch.png",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      description: "Ergonomic RGB mouse for gamers",
      price: 1000,
      imgSrc: "/watch.png",
    },
    {
      id: 5,
      name: "adil",
      description: "Ergonomic RGB mouse for gaasdfasdfasdfasdfasdfasdfasdfasmerfasdasdfjahsdhfskhdfjhaskldjhfalksjdhfklashfdlakshdsdfasdfas",
      price: 5000,
      imgSrc: "/watch.png",
    },
    {
      id: 6,
      name: "siraj",
      description: "Ergonomic RGB mouse for gamers",
      price: 1000,
      imgSrc: "/watch.png",
    },
  ]

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, products])

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="textplace border border-gray-300 rounded-lg px-3 py-2 text-sm flex-grow sm:w-64 focus:outline-none focus:ring-2 focus:ring-white-500"
          />
          <button className="bg-blue-400 text-black px-4 py-2 rounded-lg hover:bg-gray-200 duration-300 ease-in">
            Price Filter
          </button>
        </div>
      </nav>
      <div className="w-full max-w-screen-xl m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-14 px-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="box w-full max-w-xs rounded-xl p-6 bg-[#3A222F] shadow-md">
            <div className="flex justify-center">
              <Image
                src={product.imgSrc || "/placeholder.svg"}
                alt={product.name}
                width={140}
                height={140}
                className="m-auto w-36 h-36 object-cover rounded-md"
              />
            </div>
            <h2 className="text-white font-bold text-lg mt-3 text-center">{product.name}</h2>
            <p className="text-sm text-gray-100 text-center mt-2 line-clamp-2">{product.description}</p>
            <p className="text-orange-500 font-bold text-lg mt-2 text-center">PKR : {product.price}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-3">
              <Link href={`/product/${encodeURIComponent(product.name)}_${product.price}_${encodeURIComponent(product.description)}_${encodeURIComponent(product.imgSrc)}`} className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-700 duration-300 ease-in text-center w-full sm:w-auto">Details</Link>
              <button className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-gray-700 duration-300 ease-in w-full sm:w-auto">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>  
    </>
  )
}

export default NavbarAndProducts