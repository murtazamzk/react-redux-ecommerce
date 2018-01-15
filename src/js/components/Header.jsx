import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <h1><NavLink exact to="/">Home</NavLink></h1>
);

export default Header;