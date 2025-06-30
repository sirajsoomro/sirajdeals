"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const Portal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const productList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "siraj_upload");
    data.append("cloud_name", "dacunkx5y");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dacunkx5y/image/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (json.secure_url) {
        return json.secure_url;
      } else {
        console.error("Cloudinary error:", json);
        alert("Image upload failed.");
        return null;
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload error.");
      return null;
    }
  };

  const allDeta = async () => {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('discription').value;

    try {
      let imageUrl = previewUrl || "";

      if (imageFile) {
        const uploadedUrl = await uploadToCloudinary(imageFile);
        if (!uploadedUrl) {
          alert("Image upload failed.");
          return;
        }
        imageUrl = uploadedUrl;
      }

      if (!editProductId && !imageUrl) {
        alert("Please select an image before saving.");
        return;
      }

      const productData = {
        name,
        image: imageUrl,
        price: Number(price),
        description,
      };

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

      document.getElementById('name').value = "";
      document.getElementById('price').value = "";
      document.getElementById('discription').value = "";
      document.getElementById('images').value = "";
      setImageFile(null);
      setPreviewUrl(null);
      setIsOpen(false);
      setEditProductId(null);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <div className='flex'>
      <div className='w-96 bg-amber-500'>
        <h1 className='text-white text-3xl ml-6 mt-6'>Admin Portal</h1>
        <div className='mt-5 ml-6'>
          <button className='text-2xl cursor-pointer text-black'>Product</button><br />
          <button className='mt-3 cursor-pointer text-2xl text-black'>Setting</button>
        </div>
      </div>

      <div className='bg-white w-full '>
        <h1 className='text-3xl ml-6 mt-6 font-bold'>Product Management</h1>
        <button
          className='mt-5 text-2xl ml-6 rounded bg-blue-500 text-white p-3 cursor-pointer'
          onClick={() => {
            setIsOpen(true);
            setEditProductId(null);
            setImageFile(null);
            setPreviewUrl(null);
            document.getElementById('name').value = "";
            document.getElementById('price').value = "";
            document.getElementById('discription').value = "";
            document.getElementById('images').value = "";
          }}>
          Add product
        </button>
        <div className={`fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center ${isOpen ? "flex" : "hidden"}`}>
          <div className='bg-white p-6 rounded-lg shadow-lg w-1-2 px-20'>
            <h1 className='text-3xl mt-2 font-bold'>{editProductId ? "Edit Product" : "Add Product"}</h1>

            <label htmlFor="name" className="mt-4 block font-bold text-gray-700">Name</label>
            <input type="text" id='name' placeholder='name' className="outline-none w-82 h-11 border block border-gray-300 p-2 rounded-md" />

            <label htmlFor="images" className="mt-4 block font-bold text-gray-700">Upload Image</label>
            <input
              type="file"
              id='images'
              accept="image/*"
              className="p-2 outline-none border border-gray-300 rounded-md w-82 h-11"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              }}
            />
            {previewUrl && (
              <div className="mt-2">
                <img src={previewUrl} alt="Preview" className="h-24 w-auto rounded-md" />
              </div>
            )}

            <label htmlFor="price" className="mt-4 block font-bold text-gray-700">Price</label>
            <input type="number" id='price' placeholder="price" className="p-2 outline-none border border-gray-300 rounded-md w-82 h-11" />

            <label htmlFor="discription" className="mt-4 block font-bold text-gray-700">Description</label>
            <textarea id='discription' className="p-2 outline-none border border-gray-300 rounded-md w-82 h-11"></textarea>

            <div className="flex justify-between mt-6">
              <button onClick={() => {
                setIsOpen(false);
                setEditProductId(null);
                setImageFile(null);
                setPreviewUrl(null);
              }} className='px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition'>Close</button>

              <button onClick={allDeta} className='px-4 py-2 bg-blue-500 text-white ml-16 rounded-md shadow hover:bg-orange-600 transition'>
                {editProductId ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
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
                        document.getElementById('price').value = product.price;
                        document.getElementById('discription').value = product.description;
                        setEditProductId(product.id);
                        setIsOpen(true);
                        setPreviewUrl(product.image || "");
                        setImageFile(null);
                        document.getElementById('images').value = "";
                      }}>
                      Edit
                    </button>
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
