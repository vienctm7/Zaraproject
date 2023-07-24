import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";


function EditUser() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, username, email, password } = user;
  const { id } = useParams();
  console.log("id là: ", id);

  const handleChangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/users/${id}`, user);
    window.location.href = "/home";
  };

  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:3000/users/${id}`);
    setUser(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <div className='container'>
        <div className='w-75 mx-auto shadow p-5'>
          <h3>Edit User</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor=''>Firtname: </label><br />
            <input
              type='text'
              placeholder='Enter Your Name'
              value={firstname}
              name='firstname'
              onInput={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor=''>Lastname: </label><br />
            <input
              type='text'
              placeholder='Enter Your Username'
              value={lastname}
              name='lastname'
              onInput={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor=''>Username: </label><br />
            <input
              type='text'
              placeholder='Enter Your Email Address'
              value={username}
              name='username'
              onInput={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor=''>Email: </label><br />
            <input
              type='text'
              placeholder='Enter Your Phone Number'
              value={email}
              name='email'
              onInput={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor=''>Password: </label><br />
            <input
              type='text'
              placeholder='Enter Your Website'
              value={password}
              name='password'
              onInput={(e) => handleChangeInput(e)}
            />
            <br />

            <Button variant='primary' type='submit'>
              Update User
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
