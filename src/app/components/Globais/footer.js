import { GlobeIcon } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export function Footer() {
    return (
        <div className='w-full pt-5 pb-15 border-t-1 bg-zinc-50 border-orange-500'>

            <footer className="text-black py-8 2xl:p-4 px-6 w-full lg:max-w-[1200px] xl:max-w-[1600px] mx-auto flex flex-col items-center">
                <article className="w-full flex flex-col items-center md:flex-row justify-between gap-4 mb-4 px-2">

                    <div className="flex flex-col py-6 items-center md:items-start gap-6">
                        <div className="flex gap-1 text-3xl md:text-4xl">
                            <p>Ateliê </p>
                            <p className="text-orange-500 font-bold">Pizzas</p>
                        </div>
                        <div className="flex flex-col text-center md:text-left text-zinc-500">
                            <p className="text-sm">Receba sua pizza favorita, quentinha</p>
                            <p className="text-sm">e com qualidade garantida, direto na porta da sua casa!</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4 text-sm text-zinc-500 pb-6 md:py-6 text-center md:text-right">
                        <div>
                            <p>Telefone: (11) 99999-9999</p>
                            <p>Endereço: Rua das Pizzas, 123 - São Paulo, SP</p>
                            <p>Email: contato@deliverynow.com</p>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="group hover:scale-105 text-black cursor-pointer flex items-center gap-1 bg-zinc-200 p-2 rounded-xl transition-all duration-300">
                                <FaWhatsapp className="h-6 w-6 md:h-8 md:w-8 group-hover:text-orange-500 transition-all duration-300" />

                            </div>
                            <div className="group hover:scale-105 text-black cursor-pointer flex items-center gap-1 bg-zinc-200 p-2 rounded-xl transition-all duration-300">
                                <FaInstagram className="h-6 w-6 md:h-8 md:w-8 group-hover:text-orange-500 transition-all duration-300" />
                            </div>
                        </div>
                    </div>

                </article>

                <div className="h-[1px] rounded-lg w-full bg-orange-400  " />

                <article className="flex flex-col md:flex-row gap-4 py-4 items-center">
                    <div className="flex gap-1 text-xl">
                        <span>Desenvolvido por</span>
                        <p className="text-orange-500">CODITECH</p>
                    </div>

                    <div className="flex gap-4">
                        <a
                            href="https://www.instagram.com/coditech_dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-105 text-black cursor-pointer flex items-center justify-center bg-zinc-200 p-2 rounded-xl transition-all duration-300"
                        >
                            <FaInstagram className="h-6 w-6 md:h-8 md:w-8 group-hover:text-orange-500 transition-all duration-300" />
                        </a>

                        <a
                            href="https://coditech.dev.br/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover:scale-105 text-black cursor-pointer flex items-center justify-center bg-zinc-200 p-2 rounded-xl transition-all duration-300"
                        >
                            <GlobeIcon className="h-6 w-6 md:h-8 md:w-8 group-hover:text-orange-500 transition-all duration-300" />
                        </a>
                    </div>
                </article>


                <article className="flex gap-1 text-[12px] md:text-[14px] font-normal">
                    <p>Copyright © 2025</p>
                    <p className="text-orange-500">Coditech</p>
                    <p>| All Rights Reserved</p>
                </article>

            </footer>
        </div>
    )
}