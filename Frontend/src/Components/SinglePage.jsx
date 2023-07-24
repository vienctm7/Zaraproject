import React, { useEffect } from "react";
import "../CSS/SinglePage.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import { IconButton, List } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import DrawerBody from "./Product-Page-Component/DrawerBody";
import ProductPage from "../Routes/ProductPage";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

//------------------drawer components------------//
const drawerWidth = 382;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
//------------------^------------//

const SinglePage = () => {
  const navigate = useNavigate();
  //------------------drawer components------------//
  const theme = useTheme();
  const [opend, setOpend] = React.useState(false);

  const handleDrawerClose = () => {
    setOpend(false);
  };
  //-----------------------------------------------------//

  const [size, setSize] = useState(false);
  const [sizeval, setSizeval] = useState("");

  const { id } = useParams();

  const [single, setSingle] = useState({});

  // API lấy thông tin một sản phảm theo id
  const getProductById = () => {
    axios
      .get(`http://localhost:8000/api/v1/product/${id}`)
      .then((res) => setSingle(res.data.data[0]))
      .then((err) => console.log(err));
  };
  useEffect(() => {
    getProductById();
  }, []);

  // Lấy thông tin user trên local
  const userlocal = JSON.parse(localStorage.getItem("isAuth"));

  const cartId = uuidv4();
  const newCart = {
    cartId : cartId,
    productId: single.productId,
    userId: userlocal.userId,
    quantity: 1,
  };
console.log(newCart);
  const handleClick = async (e) => {
    e.preventDefault();
    if (sizeval === "") {
      alert("Please Select A size");
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      alert("Product is added to cart");
      setSize(true);
      setOpend(true);
      await axios
        .post("http://localhost:8000/api/v1/cart", newCart)
        .then((res) => {
          if (res.data.status === 200) {
            navigate("/cart");
          }
        });
      console.log("first").catch((err) => console.log(err));
    }
  };
  const handleProcess = () => {
    navigate("/cart");
  };

  return (
    <>
      <div className="main">
        <div className="leftall">
          <div className="leftdiv">
            <h4 style={{ marginButtom: "30px" }}>MATERIALS, CARE AND ORIGIN</h4>
            <h5 style={{ marginButtom: "30px" }}>MATERIALS</h5>
            <p style={{ marginButtom: "30px" }}>{single?.materialdesc}</p>
            <p style={{ marginButtom: "30px" }}>
              To assess compliance, we have developed a programme of audits and
              continuous improvement plans.
            </p>
            <h5>{single.materialshell}</h5>
            <p style={{ marginButtom: "30px" }}>{single?.materialtype}</p>
            <h5 style={{ marginButtom: "30px" }}>CARE</h5>
            <p style={{ marginButtom: "30px" }}>{single?.care}</p>
            <h5 style={{ marginButtom: "30px" }}>ORIGIN</h5>
            <p style={{ marginButtom: "30px" }}>{single?.origin}</p>
          </div>
        </div>
        <div
          className="middleall"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="middlediv1">
            <img src={single?.image} alt="" />
          </div>
          <div className="middlediv2">
            <img src={single?.image} alt="" />
          </div>
        </div>
        <div className="rightall">
          <div className="rightdiv">
            <h4 style={{ marginButtom: "40px" }}>
              {single?.name || single?.producttitle}
            </h4>
            <p style={{ marginButtom: "40px" }}>{single?.desc}</p>
            <p style={{ marginButtom: "40px" }}>{single?.color}</p>
            <p>{single?.price}</p>
            <p style={{ marginButtom: "40px" }}>MRP incl. of all taxes</p>
            <div id="size">
              <select
                className="selectsize"
                value={sizeval}
                onChange={(e) => setSizeval(e.target.value)}
              >
                <option>Select A Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                marginButtom: "40px",
              }}
            >
              <p>FIND YOUR SIZE</p>
              <p>SIZE GUIDE</p>
            </div>
            <input
              type="button"
              className="addbutton menu-btn"
              value="ADD TO BAG"
              style={{ marginButtom: "50px" }}
              onClick={handleClick}
            />
            <input
              type="button"
              className="addbutton menu-btn"
              value="PROCESS ORDER"
              style={
                size === true
                  ? { visibility: "visible", marginTop: "25px" }
                  : { visibility: "hidden" }
              }
              onClick={handleProcess}
            />
            <p style={{ marginButtom: "40px", fontSize: "12px" }}>
              CHECK IN-STORE AVAILABILITY
            </p>
            <p style={{ marginButtom: "40px", fontSize: "12px" }}>
              DELIVERY,EXCHANGES AND RETURNS
            </p>
          </div>
        </div>
      </div>
      {/* matchwith section  */}
      <div className="matchwith" style={{ width: "95%", margin: "auto" }}>
        <h3 style={{ marginBottom: "-150px" }}>MATCH WITH</h3>
        <ProductPage limit={6} />
      </div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="temporary"
        anchor="right"
        open={opend}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          <DrawerBody />
        </List>
      </Drawer>
      <Footer />
    </>
  );
};

export default SinglePage;
