// components/Private/categorias/listaCategorias.jsx
"use client";

import { useState, useEffect } from "react";
import { InputBuscarCategorias } from "./inputBuscaCategoria";
import { Button } from "@/app/components/Globais/button";
import { CategoriaCard } from "./categoriaCard";

export function ListaCategorias({ lista }) {
    const [categoriasFiltradas, setCategoriasFiltradas] = useState(lista);

    useEffect(() => {
        setCategoriasFiltradas(lista);
    }, [lista]);

    function handleBuscar(termo) {
        const filtradas = lista.filter((categoria) =>
            categoria.categoriaNome.toLowerCase().includes(termo.toLowerCase())
        );
        setCategoriasFiltradas(filtradas);
    }

    return (
        <>
            <div className="w-full flex justify-between mb-2">
                <InputBuscarCategorias onBuscar={handleBuscar} />
                <Button style="hidden md:block" label={'Nova categoria'} path='/cadastros/cadastro_categoria' />
            </div>

            <div className="space-y-6 overflow-y-auto md:max-h-[50vh] md:pr-4 py-4">
                {categoriasFiltradas.map((categoria) => (
                    <CategoriaCard key={categoria.categoriaId} categoria={categoria} />
                ))}
            </div>

            <div>
                <Button style="md:hidden w-full" label={'Nova categoria'} path='/cadastros/cadastro_categoria' />
            </div>
        </>
    );
}
