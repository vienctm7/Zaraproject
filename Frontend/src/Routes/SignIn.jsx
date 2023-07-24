import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/SignIn.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};
const isEmailValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const SignIn = () => {
  const [formError, setFormError] = useState({});

  const [tinhThanhList, setTinhThanhList] = useState([]);
  const navigate = useNavigate();
 
  const [data, setData] = useState({
    email: "",
    phone: "",
    passwords: "",
    name: "",
    repeatpassword: "",
    role: "user",
  });
  const validateForm = () => {
    const error = {};
    if (isEmptyValue(data.name)) {
      error["name"] = "name is required";
    }
    if (isEmptyValue(data.phone)) {
      error["phone"] = "phone is required";
    }
    if (isEmptyValue(data.email)) {
      error["email"] = "email is required";
    } else {
      if (!isEmailValid(data.email)) {
        error["email"] = "email is invalid";
      }
    }
    if (isEmptyValue(data.passwords)) {
      error["passwords"] = "password is required";
    }
    if (isEmptyValue(data.repeatpassword)) {
      error["repeatpassword"] = "Repeatpassword is required";
    }
    setFormError(error);

    return Object.keys(error).length === 0;
  };

  useEffect(() => {
    // Gửi yêu cầu GET để lấy thông tin các tỉnh thành
    axios
      .get("https://provinces.open-api.vn/api/")
      .then((response) => {
        // Lưu danh sách các tỉnh thành vào state
        setTinhThanhList(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin tỉnh thành:", error);
      });
  }, []);

  const onclickhandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await axios
        .post("http://localhost:8000/api/v1/register", data)
        .then((res) => {
          if (res.data.status === 200) {
            navigate("/login");
          }
        });
      console.log("first").catch((err) => console.log(err));
    } else {
      alert("form invalidate");
    }
  };
  console.log(data);
  return (
    <>
      <div className="navbar_space"></div>
      <div className="signin_main_box">
        <h3>PERSONAL DETAILS</h3>
        <div className="personal_company_toggle">
          <div>
            <input type="radio" name="a" />
            <label htmlFor="">PERSONAL </label>
          </div>
          <div>
            <input
              type="radio"
              name="a"
              onClick={() => {
                navigate("/company");
              }}
            />
            <label htmlFor="">COMPANY</label>
          </div>
        </div>

        <div className="signin_second_box">
          <div>
            <form action="">
              <label htmlFor="">E-MAIL</label>
              <br />
              {/* <input type="email" placeholder='Enter Email' name="email" onChange={onchnageHandler}/><br /><br /> */}
              <input
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Enter Email"
                required
              />
              <br />
              <br />
              <hr />
              {formError.email && (
                <div className="error">{formError.email}</div>
              )}
              <label htmlFor="">PASSWORD</label>
              <br />
              {/* <input type="password" placeholder='Enter Password' name="password" onChange={(e)=>setData({...data,name:e.target.value})} /><br /><br /> */}
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) =>
                  setData({ ...data, passwords: e.target.value })
                }
                required
              />
              <br />
              <br />
              <hr />
              {formError.passwords && (
                <div className="error">{formError.passwords}</div>
              )}
              <label htmlFor="">NAME</label>
              <br />
              <input
                type="text"
                placeholder="NAME"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <br />
              <br />
              <hr />
              {formError.name && <div className="error">{formError.name}</div>}
              <label htmlFor="">ADDRESS</label>
              <br />
              <input type="text" placeholder="ADDRESS" />
              <br />
              <br />
              <hr />
              <label htmlFor="">LOCALITY</label>
              <br />
              <input type="text" placeholder="LOCALITY" />
              <br />
              <br />
              <hr />
              <label htmlFor="">STATE</label>
              <br />
              <select>
                {tinhThanhList.map((tinhThanh) => (
                  <option key={tinhThanh.id} value={tinhThanh.id}>
                    {tinhThanh.name}
                  </option>
                ))}
              </select>{" "}
              <br />
              <br />
              <hr />
            </form>
          </div>
          <div>
            <label htmlFor=""></label>
            <br />
            {/* <input type="email" placeholder=''/><br /><br /> */}

            <label htmlFor="">REPEAT PASSWORD</label>
            <br />
            <input
              type="email"
              placeholder="REPEAT PASSWORD"
              onChange={(e) =>
                setData({ ...data, repeatpassword: e.target.value })
              }
            />
            <br />
            <br />
            <hr />
            {formError.repeatpassword && (
              <div className="error">{formError.repeatpassword}</div>
            )}
            <label htmlFor="">PINCODE</label>
            <br />
            <input type="email" placeholder="PINCODE" />
            <br />
            <br />
            <hr />

            <label htmlFor="">MORE INFO</label>
            <br />
            <input type="email" placeholder="OPTIONAL" />
            <br />
            <br />
            <hr />

            <label htmlFor="">CITY</label>
            <br />
            <input type="email" placeholder="CITY" />
            <br />
            <br />
            <hr />

            <label htmlFor="">REGION</label>
            <br />
            <input type="email" placeholder="VIET NAM" />
            <br />
            <br />
            <hr />
          </div>
          <div></div>
        </div>
        <div className="submitSection">
          <div className="prefix_telephone">
            <div>
              PREFIX <br />
              +84
            </div>
            <div>
              <label htmlFor="">TELEPHONE</label>
              <br />
              <input
                type="number"
                placeholder="TELEPHONE"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
              <hr />
              {formError.phone && (
                <div className="error">{formError.phone}</div>
              )}
            </div>
          </div>
          <div className="checkbox_input">
            <input type="checkbox" />
            <label htmlFor="">I WISH TO RECEIVE ZARA NEWS ON MY E-MAIL</label>
            <br />
            <input type="checkbox" />
            <label htmlFor="">I ACCEPT THE PRIVACY STATEMENT</label>
          </div>
          <button type="submit" onClick={onclickhandler}>
            CREATE ACCOUNT
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignIn;
