"use client";

import { useState, useEffect } from "react";
import ProdutoCard from "@/app/components/Private/produtos/produtoCard";
import { InputBuscarProdutos } from "./inputBuscaProdutos";
import { Button } from "@/app/components/Globais/button";

export function ListaProdutos({ lista }) {
    const [produtosFiltrados, setProdutosFiltrados] = useState(lista);

    useEffect(() => {
        setProdutosFiltrados(lista);
    }, [lista]);

    function handleBuscar(termo) {
        const filtrados = lista.filter((produto) =>
            produto.produtoNome.toLowerCase().includes(termo.toLowerCase())
        );
        setProdutosFiltrados(filtrados);
    }

    return (
        <>
            <div className="w-full flex justify-between mb-2">
                <InputBuscarProdutos onBuscar={handleBuscar} />
                <Button style="hidden md:block" label={'Novo produto'} path='/cadastros/cadastro_produto' />
            </div>

            <div className="space-y-6 overflow-y-auto md:max-h-[50vh] md:pr-4 py-4">
                {produtosFiltrados.map((produto) => (
                    <ProdutoCard key={produto.produtoId} produto={produto} />
                ))}
            </div>

            <div>
                <Button style="md:hidden w-full" label={'Novo produto'} path='/cadastros/cadastro_produto' />
            </div>
        </>
    );
}
