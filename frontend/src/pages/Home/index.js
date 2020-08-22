import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

// import api from '../../services/api';

// import { Container, Table } from './styles';

import './styles.css';


const hash = 'a6b8396497d43ad6ee700eecc7051504';
const timestamp = 1598130403;
const apiKey = '977171badb682dfff5ab737f4d99e037'



const Home = () => {


  useEffect(() => {

    const {data} = await axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hash}`)

    console.log(data)
  }, [])



  console.log('eai')

  return (

    <div id="page-home">
    <div className="content">


      <main>
        <h1>Marvel App</h1>
        <p>
          We will help you to find your favorite Heroes
        </p>

        <Link to="/create-point">
          <span>
            {/* <FiLogIn /> */}
          </span>
          <strong>Login</strong>
        </Link>
      </main>
    </div>
  </div>


  );
};

export default Home;
