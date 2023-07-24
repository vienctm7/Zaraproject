import { useNavigate, useParams } from "react-router-dom";
import "../CSS/Cart.css";
import Footer from "./Footer";
import axios from "axios";
import { useState, useEffect } from "react";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const loadData = async () => {
    await axios
      .get("http://localhost:8000/api/v1/cart/")
      .then((res) => {
        setCartData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  console.log(cartData);

  const { id } = useParams();
  const navigate = useNavigate();
  const deletehandle = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/v1/cart/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          navigate("/cart");
        }
        loadData();
        window.location.reload();
       
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    // Xử lý cập nhật số lượng sản phẩm trong giỏ hàng
    cartData.forEach((item) => {
      axios
        .put(`http://localhost:8000/api/v1/cart/${item.cartId}`, {
          quantity: item.quantity,
        })
        .then((res) => {
          console.log(res.data);
          // Cập nhật lại dữ liệu sau khi thành công
          loadData();
          
        })
        .catch((err) => console.log(err));
    });
  };

  const addHandler = ( index ) => {
    const newCartData = [...cartData];
    if (newCartData[index].quantity < 10) {
      newCartData[index].quantity += 1;
      setCartData(newCartData);
    }
    handleUpdate();
  };
  const reduceHandler = (index) => {
    const newCartData = [...cartData];
    if (newCartData[index].quantity <= 10 && newCartData[index].quantity > 1 ) {
      newCartData[index].quantity -= 1;
      setCartData(newCartData);
    }
    handleUpdate();
  };
  const handleCheckout = () => {
    if (cartData && cartData.length > 0) {
      navigate("/checkout");
    } else {
      alert("Please Add Some Items To Your Cart In Order To Proceed");
    }
  };

  let sum = 0;
  cartData &&
    cartData.forEach((element) => {
      sum += element.price * element.quantity;
    });

  return (
    <>
      <div className="container">
        <div className="heading">
          <span>CART({cartData ? cartData.length : "0"})</span>
          <span>WISHLIST</span>
        </div>
        <div className="shoping-cart-msg">
          Items in the basket are not reserved until completing the purchase.
        </div>

        <div className="cart-item-flex">
          {cartData && cartData.length === 0 ? (
            <div style={{ textTransform: "uppercase" }}>cart data is empty</div>
          ) : (
            cartData?.map((item, index) => (
              <div className="cart-item" key={item.id}>
                <div
                  className="cart-item-header"
                  style={{ fontSize: "13px", paddingBottom: "10px" }}
                >
                  {" "}
                  <b>{item.producttitle} </b>{" "}
                </div>
                <div className="cart-item-container">
                  <div>
                    <img src={item.image} alt="" />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-description">
                      <div>
                        REF. | {item.color ? item.color.split("|")[1] : "453/2"}
                      </div>
                      <div style={{ textTransform: "uppercase" }}>
                        {item.color ? item.color.split("|")[0] : "orange"}
                      </div>
                      <div>M (UK M)</div>
                      <div>
                        {" "}
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            reduceHandler(index);
                          }}
                        >
                          -
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            addHandler(index);
                          }}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="item-quantity" style={{ fontSize: "12px" }}>
                      <div>{item.price}</div>
                    </div>
                    <div>
                      {" "}
                      <button onClick={() => deletehandle(item.cartId)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bottom-btn">
          <div>
            <div>
              <b>TOTAL VND{sum} </b>
            </div>
            <div>INCLUDING GST</div>
            <div>* EXCL SHIPPING COST</div>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            CONTINUE
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
