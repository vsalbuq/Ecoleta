import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.svg';

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Your waste collection marketplace.</h1>
          <p>We help people to find waste collection points efficiently.</p>

          <Link to="/register">
            <span>
              <FiLogIn />
            </span>
            <strong>Register a waste collection point</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
