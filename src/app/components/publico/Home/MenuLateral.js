"use client"

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export function MenuLateral({ numero, top, right }) {

    const [menuAberto, setMenuAberto] = useState(false);
    const [Pagina, setPagina] = useState(numero);
    const router = useRouter();
    const pathname = usePathname();

    function toggleMenu() {
        setMenuAberto(!menuAberto);
    }

    function menu(num) {
        setPagina(num)
    }

    return (
        <div className="lg:hidden">
            <div className="absolute" style={{ top: `${top * 4}px`, right: `${right * 4}px` }}>
                <Bars3Icon onClick={toggleMenu} className="h-10 w-10 text-red-500 cursor-pointer"></Bars3Icon>
            </div>

            <div className={`fixed z-1000 top-0 right-0 h-full border-l-1 border-zinc-400  bg-white font-bold text-black w-64 transform ${menuAberto ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
                <div className="p-4 mt-1">
                    <div className="flex justify-between w-full">
                        <div className="w-2/4 text-xl">
                            <h2 className="font-bold">Ateliê</h2>
                            <h3 className="font-bold text-orange-500">Pizzas</h3>
                        </div>
                        <Bars3Icon onClick={toggleMenu} className="h-10 w-10 text-black cursor-pointer" />
                    </div>
                    <ul className="mt-4 space-y-2 flex flex-col gap-1">
                        <li
                            onClick={() => {
                                menu(0);
                                router.push("/");
                            }}
                            className={`cursor-pointer transition-all duration-100 hover:bg-zinc-200 p-2 rounded ${Pagina === 0 || pathname === "/" ? "bg-zinc-200" : ""}`}
                        >
                            Início
                        </li>

                        <li
                            onClick={() => {
                                menu(1);
                                router.push("/carrinho");
                            }}
                            className={`cursor-pointer transition-all duration-100 hover:bg-zinc-200 p-2 rounded ${Pagina === 1 || pathname === "/carrinho" ? "bg-zinc-200" : ""}`}
                        >
                            Carrinho
                        </li>

                        <li
                            onClick={() => {
                                menu(2);
                                router.push("/SelecionarSabor/1");
                            }}
                            className={`cursor-pointer transition-all duration-100 hover:bg-zinc-200 p-2 rounded ${Pagina === 2 || pathname === "/cardapio" ? "bg-zinc-200" : ""}`}
                        >
                            Cardápio
                        </li>

                        <li
                            onClick={() => {
                                menu(3);
                                
                            }}
                            className={`cursor-pointer transition-all duration-100 hover:bg-zinc-200 p-2 rounded ${Pagina === 3 || pathname === "/contato" ? "bg-zinc-200" : ""}`}
                        >
                            Contato
                        </li>

                        <li
                            onClick={() => {
                                menu(4);
                               
                            }}
                            className={`cursor-pointer transition-all duration-100 hover:bg-zinc-200 p-2 rounded ${Pagina === 4 || pathname === "/promocoes" ? "bg-zinc-200" : ""}`}
                        >
                            Promoções
                        </li>

                        <li
                            onClick={() => {
                                menu(5);
                                router.push("/dashboard");
                            }}
                            className={`cursor-pointer transition-all duration-100 hover:bg-zinc-200 p-2 rounded ${Pagina === 5 || pathname === "/dashboard" ? "bg-zinc-200" : ""}`}
                        >
                            Dashboard
                        </li>
                    </ul>
                </div>
            </div>
        </div>



    )
}