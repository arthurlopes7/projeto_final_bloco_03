import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import Categoria from "../models/Categoria";
import CardCategorias from "./CardCategorias";
import { buscar } from "../service/categoriaService";
import { ToastAlerta } from "../utils/ToastAlerta";

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function buscarCategorias() {
    setIsLoading(true);
    try {
      await buscar(`/categorias`, setCategorias);
    } catch (error) {
      ToastAlerta("Ocorreu um erro ao tentar buscar as categorias!", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  return (
    <div className="container mx-auto my-16 px-4">
      <h1 className="text-4xl text-center font-bold mb-8">Lista de Categorias</h1>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[80vh]">
          <Circles
            height="200"
            width="200"
            color="white"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categorias.map((categoria) => (
                <CardCategorias key={categoria.id} categoria={categoria} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaCategorias;
