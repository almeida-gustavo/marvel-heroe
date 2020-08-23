import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Home = () => (

    <div id="page-home">
        <div className="content">

            <main>
                <h1>Marvel App</h1>
                <p>
                    We will help you to find your favorite Heroes
                </p>

                <Link to="/heroes">
                    <span />
                    <strong>Login</strong>
                </Link>
            </main>
        </div>
    </div>

);

export default Home;
