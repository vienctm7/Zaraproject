import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';

function LayoutAddmin() {
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
                  <h4>Addmin User</h4>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/homeProducts"
                >
                  <h4>Admin Products</h4>
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
            <div className="d-flex">
               <Link to ={"user/add"}>
               <Button variant="outline-info">Add Product</Button>
               </Link>
              </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default LayoutAddmin;
