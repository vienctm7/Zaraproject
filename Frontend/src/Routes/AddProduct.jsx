import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../CSS/Form.css";
import { Link } from "react-router-dom";

function AddProduct() {
  const [product, setProduct] = useState({
    anh: "",
    name: "",
    price: "",
    quantity: "",
    id: "",
  });

  const { anh, name, price, quantity, id } = product;
  const handleChangeInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/products", product);
    window.location.href = "/home";
  };
  
  return (
    <div>
              <div class="container">
    <h1>Welcome to Admin Page</h1>
    <Link to={"/adminUser"} class="button">Manage Users</Link>
    <Link to={"/adminProduct"} class="button">Manage Products</Link>
    <a href="#" class="button">Add Product</a>
  </div>
    <div className='container'>
      <div className='w-75 mx-auto shadow p-5'>
        <h3>Add Product</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor=''>Image: </label><br />
          <input
            type='text'
            placeholder='Add image'
            value={anh}
            name='anh'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor=''>Name: </label><br />
          <input
            type='text'
            placeholder='Enter Your name product'
            value={name}
            name='name'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor=''>Price: </label><br />
          <input
            type='text'
            placeholder='Enter Your price'
            value={price}
            name='price'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor=''>Quantity: </label><br />
          <input
            type='text'
            placeholder='Enter Your Phone Number'
            value={quantity}
            name='quantity'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor=''>Id: </label><br />
          <input
            type='text'
            placeholder='Enter Your IDProduct'
            value={id}
            name='id'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AddProduct;
