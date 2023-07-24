import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

function AddUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const { name, username, email, phone, website } = user;
  const handleChangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/users", user);
    window.location.href = "/home";
  };
  
  return (
    <div className='container'>
      <div className='w-75 mx-auto shadow p-5'>
        <h3>Add User</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor=''>Name: </label><br />
          <input
            type='text'
            placeholder='Enter Your Name'
            value={name}
            name='name'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor=''>UserName: </label><br />
          <input
            type='text'
            placeholder='Enter Your Username'
            value={username}
            name='username'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor=''>Email: </label><br />
          <input
            type='text'
            placeholder='Enter Your Email Address'
            value={email}
            name='email'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor=''>UserNamePhone: </label><br />
          <input
            type='text'
            placeholder='Enter Your Phone Number'
            value={phone}
            name='phone'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor=''>Website: </label><br />
          <input
            type='text'
            placeholder='Enter Your Website'
            value={website}
            name='website'
            onInput={(e) => handleChangeInput(e)}
          />
          <br />

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
