import { ChangeEvent, useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../models/Categoria";
import { atualizar, buscar, cadastrar } from "../service/categoriaService";
import { ToastAlerta } from "../utils/ToastAlerta";

function FormCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error) {
      ToastAlerta("Não foi possível realizar a busca", "erro");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/categorias");
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/categorias/${id}`, categoria, setCategoria);
        ToastAlerta("Categoria atualizada com sucesso!", "sucesso");
      } else {
        await cadastrar(`/categorias`, categoria, setCategoria);
        ToastAlerta("Categoria cadastrada com sucesso!", "sucesso");
      }
    } catch (error) {
      ToastAlerta("Erro ao processar a solicitação", "erro");
    } finally {
      setIsLoading(false);
      retornar();
    }
  }

  return (
    <div className="container flex flex-col items-center mx-auto min-h-[67vh] bg-blue-900 my-16 w-6/12 text-white justify-center pb-20 rounded-2xl">
      <h1 className="text-4xl text-center font-bold uppercase my-8">
        {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
      </h1>
      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2 font-bold">
          <label htmlFor="nome" className="uppercase text-lg">
            Categoria
          </label>
          <input
            className="h-9 rounded-md text-blue-900 px-2"
            type="text"
            placeholder="Digite a categoria"
            name="nome"
            value={categoria.nome}
            onChange={atualizarEstado}
          />
        </div>
        <button
          className="cursor-pointer bg-blue-700 rounded-2xl py-2 px-4 hover:bg-blue-500 hover:border-transparent transition-all duration-300 flex justify-center items-center"
          type="submit"
        >
          {isLoading ? (
            <Circles
              height="25"
              width="80"
              color="white"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;
