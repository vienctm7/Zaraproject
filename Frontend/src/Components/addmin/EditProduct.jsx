import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";


function EditProduct() {
  const [product, setProduct] = useState({
    anh: "",
    name: "",
    price: "",
    quantity: "",
   
  });

  const { anh, name, price, quantity } = product;
  const { id } = useParams();
  console.log("id là: ", id);

  const handleChangeInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/products/${id}`, product);
    window.location.href = "/home";
  };

  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:3000/products/${id}`);
    setProduct(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <div className='container'>
        <div className='w-75 mx-auto shadow p-5'>
          <h3>Edit Product</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor=''>Image: </label><br />
            <input
              type='text'
              placeholder='Enter Your image'
              value={anh}
              name='anh'
              onInput={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor=''>Name: </label><br />
            <input
              type='text'
              placeholder='Enter Your Username'
              value={name}
              name='name'
              onInput={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor=''>Price: </label><br />
            <input
              type='text'
              placeholder='Enter Your Email Address'
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
            <br />

            <Button variant='primary' type='submit'>
              Update User
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
