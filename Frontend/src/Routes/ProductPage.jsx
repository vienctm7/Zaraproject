import React from 'react';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from '../Components/Product-Page-Component/ProductCard';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const ProductPage = ({limit}) => {
    const location = useLocation();
    const term = location.state?.query;
 
    const [products, setProducts] = useState([]);
    const loadData = async () => {
        await axios
          .get("http://localhost:8000/api/v1/product")
          .then((res) => {
            setProducts(res.data.data);
          })
          .catch((err) => console.log(err));
      };
    
      useEffect(() => {
        loadData();
      }, []);
  console.log(products);
    return (
        <ProdContainer>
            <div className="gridlayout">
                {products.map((item) => {
                    return (<ProductCard key={item.productId} id={item.productId} item={item} />)
                })}
            </div>
        </ProdContainer>
    )
}

export default ProductPage

const ProdContainer = styled.div`
    width: 90%;
    margin: auto;
    padding-top: 150px;
    margin-bottom:50px;

    .gridlayout {
        display: grid;
        width: 100%;
        gap: 15px;
        grid-template-columns: repeat(auto-fit,minmax(200px,max-content));
    }


`