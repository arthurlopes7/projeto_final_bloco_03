import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../models/Categoria";
import { Circles } from "react-loader-spinner";
import { buscar, deletar } from "../service/categoriaService";
import { ToastAlerta } from "../utils/ToastAlerta";

function DeletarCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error) {
      ToastAlerta("Ocorreu um erro ao tentar buscar a categoria", "erro");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    navigate("/categorias");
  }

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`);
      ToastAlerta("Categoria deletada com sucesso", "sucesso");
      navigate("/categorias");
    } catch (error) {
      ToastAlerta("Erro ao deletar categoria", "erro");
    }
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto my-8 p-4 w-full md:w-1/2 lg:w-1/3">
      <h1 className="text-4xl text-center mb-6">Deletar Categoria</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza que quer deletar?
      </p>
      <div className="border border-blue-800 flex flex-col rounded-lg overflow-hidden shadow-lg">
        <header className="py-2 px-6 bg-blue-900 text-white font-bold text-xl">
          Categoria
        </header>
        <p className="p-6 text-xl bg-blue-100 h-full">{categoria.nome}</p>
        <div className="flex">
          <button
            className="w-full bg-red-600 hover:bg-red-800 text-white py-2 transition duration-300"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 flex items-center justify-center transition duration-300"
            onClick={deletarCategoria}
            disabled={isLoading}
          >
            {isLoading ? (
              <Circles
                height="25"
                width="80"
                color="white"
                ariaLabel="circles-loading"
                visible={true}
              />
            ) : (
              "Sim"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;
