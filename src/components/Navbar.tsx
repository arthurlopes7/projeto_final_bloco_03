import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-center bg-blue-900 py-4 w-full text-white">
      <div className="container flex justify-between text-lg">
        <Link to="/home" className="font-bold text-2xl">
          Farmacia Arthur
        </Link>
        <div className="flex gap-12">
          <Link to="/categorias" className="hover:underline hover:text-blue-300">
            Categorias
          </Link>
          <Link to="/cadastrarcategoria" className="hover:underline hover:text-blue-300">
            Cadastrar Categoria
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

