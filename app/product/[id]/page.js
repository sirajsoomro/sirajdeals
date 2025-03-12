'use client'

import React from 'react'
import { useParams } from 'next/navigation'

export default function productPage() {
  const { id } = useParams();
    console.log(id);
    
    const [name, price, description, imgSrc] = id ? id.split("_") : ["", "", "", ""];

  return (
            <div  className="shadow-lg rounded-xl p-4 w-62  bg-[#3A222F]">
              <img src={imgSrc || "https://www.sirajdeals.shop/logo.png"} alt="Product" className="m-auto w-40 h-40 object-cover rounded-md" />
              <h2 className="text-white font-bold text-lg mt-3 ml-7">{name}</h2>
              <p className="text-sm text-gray-100 ml-7 mt-2">{description}</p>
              <p className="text-orange-500 font-bold text-lg mt-2 ml-7">PKR : {price}</p>
            </div>
  )
}
