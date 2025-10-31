'use client'

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/Globais/button"
import { IoSettingsOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { LuListCheck } from "react-icons/lu";
import { HiOutlineDocumentDuplicate, HiPlus } from "react-icons/hi2";
import { Bars3Icon } from "@heroicons/react/24/outline"
import { useMenu } from "@/app/(private)/dashboard/context/MenuContext";

export function MenuLateralDashboard({ nome }) {
    const pathname = usePathname(); // detecta mudança de rota
    const { menuAberto, toggleMenu, setMenuAberto } = useMenu();

    // Fecha o menu sempre que mudar de rota
    useEffect(() => {
        setMenuAberto(false);
    }, [pathname]);

    return (
        <aside className={`min-h-screen bg-gray-800 flex flex-col items-center gap-8 font-semi-bold
         text-white w-[220px] fixed md:relative transition-transform duration-300 right-0
         ${menuAberto ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 z-50`}>
            
            <div className="flex flex-col gap-5 mt-6 md:mt-10 w-full">
                <div className="flex justify-between pr-5">
                    <div>
                        <h1 className="text-xl font-bold pl-10">Olá</h1>
                        <h1 className="text-xl font-bold pl-10">{nome}</h1>
                    </div>
                    <Bars3Icon
                        onClick={toggleMenu}
                        className="h-10 w-10 text-white cursor-pointer ml-5 block md:hidden"
                    />
                </div>

                <section className="flex flex-col gap-4 w-full items-center">
                    <Button style="pl-10" icon={<IoSettingsOutline />} variante="transparent" label={"Geral"} path="/dashboard" />
                    <Button style="pl-10" icon={<CiBoxes />} variante="transparent" label={"Produtos"} path="/dashboard/produtos" />
                    <Button style="pl-10" icon={<LuListCheck />} variante="transparent" label={"Pedidos"} path="/dashboard/pedidos" />
                    <Button style="pl-10" icon={<HiOutlineDocumentDuplicate />} variante="transparent" label={"Categorias"} path="/dashboard/categorias" />
                </section>
            </div>

            <div className="flex flex-col gap-5 w-full items-center">
                <h1 className="text-xl text-zinc-400">Ações rápidas</h1>

                <section className="flex flex-col gap-3 w-full">
                    <Button icon={<HiPlus />} variante="transparent" label={"Novo produto"} path="/cadastros/cadastro_produto" />
                    <Button icon={<HiPlus />} variante="transparent" label={"Nova categoria"} path="/cadastros/cadastro_categoria" />
                </section>

                <div className="flex flex-col w-full items-center mt-2">
                    <h1 className="text-xl text-zinc-400 mb-5">Configurações</h1>
                    <p className='relative cursor-pointer transition-all hover:opacity-80 duration-300 hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-red-500 after:transition-all after:duration-300'>
                        Sair da conta
                    </p>
                </div>
            </div>
        </aside>
    );
}
