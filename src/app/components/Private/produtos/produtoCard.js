"use client";

import { useState } from "react";
import Image from "next/image";
import { ButtonDelete } from "../../Globais/buttonDelete";
import { Button } from "../../Globais/button";
import { useRouter } from "next/navigation";
import FormEditar from "../ModalEditar";

export default function ProdutoCard({ produto }) {

    const router = useRouter();

    const [visivel, setVisivel] = useState(true);
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(prev => !prev);
    }

    const removerProduto = () => {
        setVisivel(false);
    };

    if (!visivel) return null;

    return (
        <>
            <div
                className="w-full flex flex-col md:flex-row text-center md:text-left items-center border-2 border-transparent bg-white rounded-lg shadow p-4 hover:shadow-xl hover:-translate-y-1
            hover:bg-zinc-100 hover:border-orange-300 transition-all duration-300"
            >
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/publico/imagem/${produto.produtoImagem}`}
                    width={200}
                    height={200}
                    alt="Imagem da pizza"
                    className="rounded-md object-cover border"
                />
                <div className="flex flex-col md:ml-6 mt-2 md:mt-0 space-y-4 w-full">
                    <div className="flex flex-col justify-between flex-1">
                        <h2 className="text-2xl font-semibold text-black">{produto.produtoNome}</h2>
                        <p className="text-gray-500 text-base mt-1 mb-2 line-clamp-2">
                            <span className="text-zinc-800 text-lg">Descrição:</span> {produto.produtoDescricao}
                        </p>
                        <span className="text-lg font-bold text-green-600">
                            <span className="text-zinc-800 font-normal">Preço:</span> R$ {produto.produtoPreco?.toFixed(2)}
                        </span>
                    </div>

                    <div className="space-y-4 w-full md:w-[200px] flex flex-col">
                        <button onClick={handleClick}
                            className="px-4 py-2 bg-zinc-300 text-black rounded w-full
                                        hover:-translate-y-1 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"
                            type="button"
                        >
                            Editar produto
                        </button>
                        <ButtonDelete id={produto.produtoId} path={"/produto/"} onDelete={() => removerProduto(produto.produtoId)} />
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-20">
                    <FormEditar
                        id={produto.produtoId}
                        tipo="produto"
                        dadosIniciais={{
                            produtoNome: produto.produtoNome,
                            produtoPreco: produto.produtoPreco,
                            produtoImagem: produto.produtoImagem,
                            produtoDescricao: produto.produtoDescricao,
                            produtoStatus: true,
                            categoriaFk: 27
                        }}
                        onSubmit={handleClick}
                    />
                </div>
            )}
        </>



    );
}
