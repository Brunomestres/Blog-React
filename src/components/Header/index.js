import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
export default function Header() {
  return (
    <header id="main-header">
      <div className="content">
        <Link to="/">Blog Programador</Link>
        <Link to="/login">Entrar</Link>
      </div>
    </header>
  );
}
