import { Link } from "react-router-dom";
import Categoria from "../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardTemas({ categoria }: CardCategoriaProps) {
  return (
    <div className="border border-blue-800 flex flex-col rounded-lg overflow-hidden shadow-lg m-4">
      <header className="py-2 px-6 bg-blue-900 text-white font-bold text-xl">
        Categoria
      </header>

      <div className="p-6 bg-blue-100 flex-grow">
        <p className="text-2xl">{categoria.nome}</p>
      </div>

      <div className="flex">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 flex items-center justify-center transition-all duration-300"
        >
          <button className="focus:outline-none">Editar</button>
        </Link>

        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="w-full bg-red-600 hover:bg-red-800 text-white py-2 flex items-center justify-center transition-all duration-300"
        >
          <button className="focus:outline-none">Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardTemas;
