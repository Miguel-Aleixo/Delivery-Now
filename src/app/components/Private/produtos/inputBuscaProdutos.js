"use client";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useState } from "react";

export function InputBuscarProdutos({ onBuscar }) {
    const [search, setSearch] = useState("");

    function handleChange(e) {
        const valor = e.target.value;
        setSearch(valor);
        onBuscar(valor);
    }

    return (
        <div className="flex flex-col md:flex-row w-full justify-between mb-4">
            <div className="flex gap-4 bg-zinc-200 border-2 border-transparent shadow-xl p-4 w-full md:w-[420px] items-center rounded-sm
                           hover:shadow-2xl hover:-translate-y-1 hover:rounded-2xl hover:border-orange-300 transition-all duration-300">
                <HiMiniMagnifyingGlass className=" text-base md:text-xl" />
                <input
                    placeholder="Pesquise pelos produtos desejados"
                    className="w-full outline-none"
                    value={search}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
