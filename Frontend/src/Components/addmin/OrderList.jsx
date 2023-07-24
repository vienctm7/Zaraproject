import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function HomeAdmin() {
  const [data, setData] = useState([]);
  const loadUser = async () => {
    const result = await axios.get("http://localhost:3000/orders");
    setData(result.data);
  };
  
  useEffect(() => {

    loadUser();
  }, []);
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/orders/${id}`)
    loadUser();
  }
  return (
    
    <div>
    <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home"><h2>Home Page</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/homeAdmin">
                 <h4> Addmin User</h4>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/homeProducts"
                >
                  <h4> Admin Products</h4>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/orderList"
                >
                  <h4>Admin Order</h4>
                </Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2>Admin Users</h2>
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr className="bg-dark text-white">
              <th>Stt</th>
              <th>Username</th>
              <th>Date</th>
              <th>TotalPrice</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.date}</td>
                <td>{user.totalPrice}</td>
          
                <td>
                  <Link to = {`/user/editUser/${user.id}`}>
                  <Button variant="warning">Edit</Button>{' '}
                  </Link>
                </td>
                <td>
                <Link>
                  <Button onClick={()=>deleteUser(user.id)} variant="danger">Delete</Button>{' '}
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

export default HomeAdmin;
