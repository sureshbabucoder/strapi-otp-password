import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";


function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:1337/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const productsData = response.data.data;
      // console.log(response.status)
      // console.log(products)
      setProducts(productsData);
    } catch(err) {
      if (err.code===403){
        setError("This User does not have access to create and delete products");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };
  // const handleUpdate = (updatedProduct) => {
  //   const updatedProducts = products.map((product) => {
  //     if (product.id === updatedProduct.id) {
  //       return { ...product, ...updatedProduct };
  //     }
  //     return product;
  //   });
  //   setProducts(updatedProducts);
  // };
  return (
    <>
    <div className="card">
      <div className="card-header  text-primary">
        <p className="h4"> PRODUCTS LIST</p>
      </div>
    </div>
      <div className="card-body bg-light mt-5">
        <p className="h4 text-danger">{error}</p>
        {products.map((product,index) => (
              <div key={product.id} className="text-center m-3">
                <h2 className="text-success">Name: {product.attributes.name}</h2>
                <h2 className="text-success">Price: {product.attributes.price}</h2>
                <DeleteProduct productId={product.id} onDelete={handleDelete} onError={setError} />
              </div>
          ))}
      </div>
      <Link to="/create-product">
        <button className="btn btn-primary btn-sm mt-3">Create Product</button>
      </Link>
      </>
  );
}

export default Home;
