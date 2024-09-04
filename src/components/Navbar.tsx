import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Farmácia</Link>
        <div>
          <Link to="/" className="px-4 hover:text-blue-300">Home</Link>
          <Link to="/categories" className="px-4 hover:text-blue-300">Categorias</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
