import React from "react";
import AddCart from "./AddCart";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductCtard = ({ item,productId }) => {

  return (
    <ProductCardContainer key={productId}>
      {/* image */}
      <Link to={`/products/${item.productId}`}>
        <div>
          <img
            style={{ width: "100%", minHeight: "300px" }}
            src={item.image}
            alt={item.name}
          />
        </div>
        </Link>
        <div style={{ marginTop: "-50px",textAlign:'center' }}>
          {" "}
          <AddCart id = {productId} data={item} />
        </div>
        {/* details */}
        <div className="flexStyling">
          <div className="nameStyling">
          <Link to={`/product/${item.productId}`}>
            <div>{item.name}</div>
          </Link>
            {" "}
            {/* <div className="iconStyling">
              <CircleIcon sx={{ fontSize: "10px" }} />
            </div> */}
          </div>
          <div className="priceS">{item.price}</div>
        </div>

    </ProductCardContainer>
  );
};
const ProductCardContainer = styled.div`
  max-width: 354px;

  .nameStyling {
    display: flex;
    overflow: hidden;
    height: 13px;
    width: 70%;
  }
  .nameStyling a{
    text-decoration: none;
    color: black;
  }
  .nameStyling a:hover{
    text-decoration: underline;
  }
  .flexStyling {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 11px;
    text-align: left;
  }
  .iconStyling {
    padding: 0px 3px 2px 2px;
  }
  .priceS {
    width: 60px;
    text-align: right;
  }
`;

export default ProductCtard;
