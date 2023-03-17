import React from 'react';
import '../styles.css';

function Navbar() {
  return (
    <nav className="navigation">
      <ul>
        <li style={{'backgroundColor':'grey','borderRadius':'10px'}}><a style={{'color':'white'}} href="/">Home</a></li>
        <li style={{'backgroundColor':'grey','borderRadius':'10px'}}><a style={{'color':'white'}} href="/signIn">Sign In</a></li>
        <li style={{'backgroundColor':'grey','borderRadius':'10px'}}><a style={{'color':'white'}} href="/admin">Admin</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
