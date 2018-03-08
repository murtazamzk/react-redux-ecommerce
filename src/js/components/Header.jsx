import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <header>
    <NavLink className="logo" exact to="/">
      <img src='img/logo.svg' alt='React Ecommerce' />
    </NavLink>
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        <li>
          <NavLink exact to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
