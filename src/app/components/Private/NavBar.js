"use client"

import { Button } from "../Globais/button"
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/outline"
import { useMenu } from "@/app/(private)/dashboard/context/MenuContext";

export function NavBar() {
    const { toggleMenu } = useMenu();

    return (
        <div className="bg-white shadow-sm w-full h-fit">
            <nav className="flex flex-row justify-between items-center px-5 py-5">
                <Image className="hidden md:block" src='/imagem/pizza.webp' alt="Logo" width={100} height={0} />
                <h1 className="text-2xl font-bold hidden md:block">Ateliê Pizzas e Pães Caseiros</h1>
                <div className='flex flex-col justify-center'>
                    <Button style="font-bold" label={'Visitar Home'} path={'/'} />
                </div>
                    <div className="block md:hidden">
                        <Bars3Icon onClick={toggleMenu}
                        className="h-10 w-10 text-red-500 cursor-pointer"></Bars3Icon>
                    </div>
            </nav>
        </div>
    )
}