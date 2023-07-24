import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
function HomeAdminProducts() {
  const [data, setData] = useState([]);
  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/api/v1/product");
    setData(result.data.data);
  };
  useEffect(() => {
    loadUser();
  }, []);
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`)
    loadUser();
  }
  return (
    <div>
      <div className="container">
      <h1>Welcome to Admin Page</h1>
    <p>You have access to the admin features.</p>
    <Link to={"/adminUser"} class="button">Manage Users</Link>
    <Link to={"/adminProduct"} class="button">Manage Products</Link>
    <Link to={"/addProduct"}class="button">Add Product</Link>
        <Table striped bordered hover>
          <thead>
            <tr className="bg-dark text-white">
              <th>id</th>
              <th> Image </th>
              <th> Name </th>
              <th> Price </th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td> <img src={product.image} width={80} alt="" /> </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <Link to = {`/editProduct/${product.id}`}>
                  <Button variant="warning">Edit</Button>{' '}
                  </Link>
                </td>
                <td>
                <Link>
                  <Button onClick={()=>deleteUser(product.id)} variant="danger">Delete</Button>{' '}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default HomeAdminProducts;
