'use client'

import { ArrowRightOnRectangleIcon, ClipboardDocumentListIcon, Cog6ToothIcon, ShoppingCartIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { DropDown } from "./dropDown";
import { FiShoppingCart } from "react-icons/fi";

export function Header({ role, carrinho = false }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            router.push('/carrinho');
        }, 400);
    };

    // Função para deletar o cookie "token"
    function deleteTokenCookie() {
        // Deleta o cookie do token
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setMenuAberto(false);
        setTimeout(() => {
            router.push('/login');
        }, 800);
    }

    const [menuAberto, setMenuAberto] = useState(false)


    function menu() {
        setMenuAberto(prev => !prev)
    }

    return (
        <header className="pt-5 px-7 md:p-0 flex md:justify-center items-center w-full">

            {/*mobile*/}

            {carrinho ? (
                <div className="flex items-center md:hidden gap-3 mb-4 relative right-2 top-1">
                    <FiShoppingCart className="text-3xl" />
                    <h2 className="text-2xl font-bold text-orange-500">Seu Carrinho</h2>
                </div>
            ) : (

                <div className="lg:hidden">
                    <h1 className="text-xl font-bold">Seja bem-vindo 👋</h1>
                    <p className="text-md text-zinc-600">O que deseja pra hoje?</p>
                </div >
            )
            }



            {/* Desktop */}

            <div className="hidden lg:flex w-full lg:max-w-[1200px] xl:max-w-[1600px] p-4 items-center justify-between border-b-2 border-zinc-100">
                <div className="w-[15%] flex justify-center items-center">
                    <h1 className="font-bold text-xl">Ateliê Pizzas e Pães Caseiros</h1>
                </div>

                <nav className="w-[70%] flex justify-center items-center">
                    <ul className="flex space-x-4 mr-20 items-center">
                        <li className="hover:text-orange-500 cursor-pointer transition-all duration-300"><a onClick={() => { router.push('/') }}>Início</a></li>
                        <li className="hover:text-orange-500 cursor-pointer transition-all duration-300"><a onClick={() => { router.push('/SelecionarSabor/2') }}>Cardápio</a></li>
                        <li className="hover:text-orange-500 cursor-pointer transition-all duration-300"><a onClick={() => { router.push('/') }}>Contato</a></li>
                    </ul>
                </nav>

                <div className="space-x-4 flex">


                    <button onClick={handleClick} className="relative bg-zinc-200 rounded-full p-4 transition-all duration-200 text-black hover:bg-orange-500 hover:text-white cursor-pointer group">
                        <ShoppingCartIcon className="h-8 w-8" />
                        <span className="opacity-0 group-hover:opacity-100 transiton-all duration-200 absolute top-18 left-[-8px] bg-zinc-300 text-black whitespace-nowrap p-2 rounded-lg">Carrinho</span>
                    </button>

                    {loading && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="text-white text-xl font-bold animate-pulse">
                                Carregando...
                            </div>
                        </div>
                    )}


                    <div className="relative">
                        <button onClick={menu} className={`relative rounded-full p-4 ${menuAberto == true ? 'bg-orange-500 text-white' : 'bg-zinc-200 text-black'} transition-all duration-200 hover:bg-orange-500 hover:text-white cursor-pointer group`}>
                            <UserIcon className="h-8 w-8" />
                            <span className={`opacity-0  ${menuAberto == true ? 'hidden' : ''} absolute transition-all duration-200 group-hover:opacity-100 top-18 left-[-15px] bg-zinc-300 text-black whitespace-nowrap p-2 rounded-lg`}>Sua conta</span>
                        </button>

                        <div className={`absolute right-0 mt-2 w-56 bg-white border border-zinc-200 shadow-xl rounded-lg overflow-hidden transition-all duration-300 z-50 ${menuAberto ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                            <DropDown onclick={deleteTokenCookie} role={role} />
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}