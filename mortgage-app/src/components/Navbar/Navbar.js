import React from 'react';

const Navbar = () => {
  return (
    <nav className="demo">
      <a href="#" className="brand">
        <span>Picnic CSS</span>
      </a>

      <input id="bmenub" type="checkbox" className="show" />
      <label for="bmenub" className="burger pseudo button">
        menu
      </label>

      <div className="menu">
        <a href="#" className="pseudo button icon-picture">
          Demo
        </a>
        <a href="#" className="button icon-puzzle">
          Plugins
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
