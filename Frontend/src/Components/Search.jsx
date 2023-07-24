import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProductCtard from './Product-Page-Component/ProductCard';
import axios from 'axios';
const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
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

      const [searchResults, setSearchResults] = useState([]);
      const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        searchProducts(e.target.value);
      };
      const searchProducts = (e) => {

        const results = products.filter((product) =>
          product.title.toLowerCase().includes(e.toLowerCase())
        );
        setSearchResults(results);
      };

    return (
        <>
            <Container>
                <div className='searchBox'>
                <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search products..."
      />
      
                    {<p style={{ textAlign: "left" }}>{searchResults.length} Result Shown</p>}
                </div>

                { <div className='productSection'>
                    <ProdContainer>
                        <div className="gridlayout">
                            {searchResults.map((item) => {
                                return (<ProductCtard key={item.id} id={item.id} item={item} />)
                            })}
                        </div>
                    </ProdContainer>
                </div>}
            </Container>

        </>
    )
}

const Container = styled.div`
    width:100%;
    margin-top:150px;
    position:absolute;
    background-color:white;
    

    .searchBox{
        width:90%;
        margin:auto;
        
        left:5%;
        position:fixed;
        padding-top:20px;
        background-color:white;
        z-index:4;
    }

    .searchBox>input{
        width:100%;
        height:30px;
        margin:auto;
        outline:none;
        border:none;
        border-bottom:1px solid grey;
        font-size:17px;
        background-color:white;
    }

    .searchBox>input::placeholder{
        text-transform:uppercase;
        font-size:17px;
    }

    .productSection{
        margin-top:-40px;
        margin-bottom:100px;
    }

`

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
export default Search