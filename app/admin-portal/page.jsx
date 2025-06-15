"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const Portal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null); // 🆕 edit mode handle

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const allDeta = async () => {
    const name = document.getElementById('name').value;
    const image = document.getElementById('images').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('discription').value;

    const productData = { name, image, price: Number(price), description };

    try {
      if (editProductId) {
        const productRef = doc(db, "products", editProductId);
        await updateDoc(productRef, productData);
        setProducts(products.map(p => p.id === editProductId ? { id: editProductId, ...productData } : p));
        alert("Product updated!");
      } else {
        const docRef = await addDoc(collection(db, "products"), productData);
        setProducts([...products, { id: docRef.id, ...productData }]);
        alert("Product added!");
      }

      // Clear form
      document.getElementById('name').value = "";
      document.getElementById('images').value = "";
      document.getElementById('price').value = "";
      document.getElementById('discription').value = "";
      setIsOpen(false);
      setEditProductId(null); // reset edit mode
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className='flex'>
      {/* Sidebar */}
      <div className='w-96 bg-amber-500'>
        <h1 className='text-white text-3xl ml-6 mt-6'>Admin Portal</h1>
        <div className='mt-5 ml-6'>
          <button className='text-2xl cursor-pointer text-black'>product</button>
          <br />
          <button className='mt-3 cursor-pointer text-2xl text-black'>setting</button>
        </div>
      </div>
      {/* Main content */}
      <div className='bg-white w-full h-screen'>
        <h1 className='text-3xl ml-6 mt-6 font-bold'>Product Management</h1>
        <button
          className='mt-5 text-2xl ml-6 rounded bg-blue-500 text-white p-3 cursor-pointer'
          onClick={() => {
            setIsOpen(true);
            setEditProductId(null); // ensure it's not in edit mode
            document.getElementById('name').value = "";
            document.getElementById('images').value = "";
            document.getElementById('price').value = "";
            document.getElementById('discription').value = "";
          }}>
          Add product</button>
        {/* Modal */}
        <div className={`fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-md flex items-center justify-center ${isOpen ? "flex" : "hidden"}`}>
          <div className='bg-white p-6 rounded-lg shadow-lg w-1-2 px-20 '>
            <h1 className='text-3xl mt-2 font-bold'>{editProductId ? "Edit Product" : "Add Product"}</h1>
            <label htmlFor="name" className="mt-4 block font-bold text-gray-700">Name</label>
            <input type="text" id='name' placeholder='name' className="outline-none w-82 h-11 border block border-gray-300 p-2 rounded-md" />
            <label htmlFor="images" className="mt-4 block font-bold text-gray-700">Image URL</label>
            <input type="text" id='images' placeholder="Enter Image URL" className="p-2 outline-none border border-gray-300 rounded-md w-82 h-11" />
            <label htmlFor="price" className="mt-4 block font-bold text-gray-700">Price</label>
            <input type="number" id='price' placeholder="price" className="p-2 outline-none border border-gray-300 rounded-md w-82 h-11" />
            <label htmlFor="discription" className="mt-4 block font-bold text-gray-700">Description</label>
            <textarea id='discription' className="p-2 outline-none border border-gray-300 rounded-md w-82 h-11"></textarea>

            <br />
            <button onClick={() => {
              setIsOpen(false);
              setEditProductId(null);
            }} className='mt-8 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition'>Close</button>

            <button onClick={allDeta} className='px-4 py-2 bg-blue-500 text-white ml-16 rounded-md shadow hover:bg-orange-600 transition'>
              {editProductId ? "Update Product" : "Save Product"}
            </button>
          </div>
        </div>
        {/* Product Table */}
        <table className="mt-10 w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length >= 1 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="p-3 border">
                    <img src={product.image || "watch.png"} alt="Product" className="cursor-pointer rounded-md m-auto h-11 w-10" />
                  </td>
                  <td className="p-3 border">{product.name}</td>
                  <td className="p-3 border">{product.price}</td>
                  <td className="p-3 border">{product.description}</td>
                  <td className="p-3 border flex gap-2">
                    <button
                      className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded"
                      onClick={() => {
                        document.getElementById('name').value = product.name;
                        document.getElementById('images').value = product.image;
                        document.getElementById('price').value = product.price;
                        document.getElementById('discription').value = product.description;
                        setEditProductId(product.id);
                        setIsOpen(true);
                      }}>
                        Edit</button>
                    <button onClick={() => deleteProduct(product.id)} className="bg-red-500 cursor-pointer text-white px-3 py-3 rounded">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portal;
