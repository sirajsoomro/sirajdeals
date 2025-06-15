'use client'
import { db } from "@/lib/firebase";
import React, { useState } from 'react'
import { useParams } from 'next/navigation'

export default function ProductPage() {
  const { id } = useParams();
  const [rawName, rawPrice, rawDescription, rawImgSrc] = id ? id.split('_') : ["", "", "", ""];
  const name = decodeURIComponent(rawName);
  const price = rawPrice;
  const description = decodeURIComponent(rawDescription);
  const imgSrc = decodeURIComponent(rawImgSrc);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden break-words w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full bg-[#3A222F] rounded-2xl p-8 shadow-xl">
        <div className="w-full">
        <img src={imgSrc} alt={name} className="w-full h-[400px] object-contain rounded-3xl" />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold text-white">{name}</h1>
          <p className="text-orange-500 text-2xl font-semibold">PKR {price}</p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg max-w-full sm:max-w-md">{description}</p>
            <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border rounded-full px-3 py-1">
              <button className="text-xl px-2 text-white">−</button>
              <span className="px-3 text-white">1</span>
              <button className="text-xl px-2 text-white">+</button>
            </div>
            <button  className="flex items-center gap-2 bg-indigo-100 text-indigo-700 font-medium px-5 py-2 rounded-full hover:bg-indigo-200 transition"> Add to cart</button>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
