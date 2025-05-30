"use client"
import React, { useState } from 'react'
const portal = () => {
    const [isOpen, setIsOpen] = useState(false)
    // const [inputvalue , setinputvalue] = useState()
    const products = JSON.parse(localStorage.getItem("products")) || []
    function allDeta() {
        let userName = document.getElementById('name').value
        let imageSrc = document.getElementById('images').value
        let price = document.getElementById('price').value
        let discription = document.getElementById('discription').value

        let product = {
            name: userName,
            image: imageSrc,
            price: price,
            description: discription
        };
        let products = JSON.parse(localStorage.getItem("products")) || [];

        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        console.log("Data saved to local storage:", product);
        document.getElementById('name').value = "";
        document.getElementById('images').value = "";
        document.getElementById('price').value = "";
        document.getElementById('discription').value = "";
    };
    function deleteProduct(index) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        window.location.reload(); 

    const adminDeta = [
        {
            image: "watch.png",
            name: "watch rolex",
            price: 99.99,
            description: "High-quality wireless headphones with noise cancellation.",
        }
    ];

    return (
        <div className='flex'>
            <div className='w-96  bg-amber-500'>
                <h1 className='text-white text-3xl ml-6 mt-6'>Admin Portal</h1>
                <div className='mt-5 ml-6'>
                    <button className='text-2xl cursor-pointer text-black'>product</button>
                    <br />
                    <button className='mt-3 cursor-pointer text-2xl text-black'>setting</button>
                </div>
            </div>
            <div className='bg-white w-full h-screen'>
                <h1 className='text-3xl ml-6 mt-6 font-bold'>Product Management</h1>
                <button className='mt-5 text-2xl ml-6 rounded bg-blue-500 text-white p-3 cursor-pointer' onClick={() => setIsOpen(true)}>Add product</button>
                <div className={`fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-md flex items-center justify-center ${isOpen ? "flex" : "hidden"}`}>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-1-2 px-20 '>
                        <h1 className='text-3xl mt-2 font-bold'>Add Product</h1>
                        <label htmlFor="name" className="mt-4 block font-bold text-gray-700">Name</label>
                        <input type="text" id='name' placeholder='name' className="outline-none w-82 h-11 border block border-gray-300 p-2 rounded-md" />

                        <label htmlFor="name" className="mt-4 block font-bold text-gray-700">images</label>
                        <input type="text" id='images' placeholder="Enter Image URL" className="p-2 outline-none border  border-gray-300  rounded-md w-82 h-11" />
                        <br />
                        <label htmlFor="name" className="mt-4 block font-bold text-gray-700">Price</label>
                        <input type="number" id='price' placeholder="price" className="p-2 outline-none border  border-gray-300  rounded-md w-82 h-11" />

                        <label htmlFor="name" className="mt-4 block font-bold text-gray-700">Discription </label>
                        <textarea id='discription' className="p-2 outline-none border  border-gray-300  rounded-md w-82 h-11"></textarea>
                        <br />
                        <button onClick={() => setIsOpen(false)} className='mt-8 px-4 py-2 bg-blue-500 text-white  rounded-md shadow hover:bg-blue-600 transition'>close</button>
                        <button onClick={allDeta} className='px-4 py-2 bg-blue-500 text-white ml-16 rounded-md shadow hover:bg-orange-600 transition'>save product</button>
                    </div>
                </div>

                <table className="mt-10 w-full text-left">
                    <tbody>
                        <tr className="bg-gray-200">
                            <th className="p-3 border">Image</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Description</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {products.length >= 1 ? (products.map((product, index) => (
                            <tr key={index} className="border">
                                <td className="p-3 border"><img src={product.image || "watch.png"} alt="Product" className="cursor-pointer rounded-md m-auto h-11 w-10" /></td>
                                <td className="p-3 border">{product.name}</td>
                                <td className="p-3 border">{product.price}</td>
                                <td className="p-3 border">{product.description}</td>
                                <td className="p-3 border flex gap-2">
                                    <button className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded">Edit</button>
                                    <button onClick={() => deleteProduct(index)} className="bg-red-500 cursor-pointer text-white px-3 py-3 rounded">Delete</button>
                                </td>
                            </tr>
                        ))) : (
                            <h1> no products found</h1>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default portal