import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Login.css";
import { useState } from "react";
import Footer from "../Components/Footer";
import styled from "styled-components";
const LogIn = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });  

  const newData = {
    email: data.email,
    passwords: data.password,
  };
  const adminuser = JSON.parse(localStorage.getItem("adminUsername"));
  console.log(adminuser);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (adminuser.email===newData.email && adminuser.passwords === newData.passwords) {
      setTimeout(() => {
        navigate("/adminUser");
      }, 2000);
      return  alert("Chào mừng đến trang Admin!");
    } else{
    try {
      
      await axios
        .post("http://localhost:8000/api/v1/login", newData)
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res);
            localStorage.setItem("isAuth", JSON.stringify(res.data.data));
            alert("thành công");
            navigate("/");
          }
        });
    } catch (error) {
      alert("sai tài khoản rồi");
    }
  }
  };

  // if (isAuth) {
  //   return <Navigate to={`/`} />;
  // }

  return (
    <>
      <div className="navbar_space"></div>
      <div className="Login_main_box">
        <div className="Login_second_box">
          <div className="Login_second_box1">
            <h2>LOG IN</h2>
            <form action="">
              <label htmlFor="">E-MAIL</label>
              <br />

              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <br />
              <br />
              <label htmlFor="">PASSWORD</label>
              <br />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <br />
              <br />
              <button onClick={handleLogin}>LOG IN</button>
            </form>
          </div>
          <div className="Login_second_box2">
            <h2>REGISTER</h2>
            <p>
              IF YOU STILL DON'T HAVE A{" "}
              <span>
                <b>ZARA.COM</b>
              </span>{" "}
              ACCOUNT, USE THIS OPTION TO ACCESS THE REGISTRATION FORM.
            </p>
            <p>
              BY GIVING US YOUR DETAILS, PURCHASING IN <b>ZARA.COM</b> WILL BE
              FASTER AND AN ENJOYABLE EXPERIENCE.
            </p>
            <button
              onClick={() => {
                navigate("/signin");
              }}
            >
              CREATE ACCOUNT
            </button>
          </div>

          <Container classname="signbox">
            <p>
              DONT HAVE AN ACCOUNT? <Link to={`/signin`}>REGISTER</Link>
            </p>
          </Container>
          <div></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Container = styled.div`
  display: none;


@media only screen and (min-width: 769px) and (max-width:845px){
      display:block;
}

@media only screen and (min-width: 481px) and (max-width:768px){

      display:block;

}

@media only screen and (min-width:320px) and (max-width:480px){

      display:block;

}

@media only screen and (max-width: 320px){

      display:block;

`;

export default LogIn;
