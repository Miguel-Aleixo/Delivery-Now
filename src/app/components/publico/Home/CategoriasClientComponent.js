'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

export function CategoriasClientComponent({ data }) {

    const router = useRouter();

    return (
        <div className="flex flex-col gap-4 w-full">
            {data.map((categoria, idx) => (
                <button
                    key={categoria.categoriaId || idx}
                    onClick={() => router.push(`/SelecionarSabor/1`)}
                    className="flex w-full rounded-xl border-2 border-transparent cursor-pointer bg-zinc-100 shadow-sm p-4 justify-between items-center hover:-translate-y-1
                    hover:border-orange-500 transition-all duration-300"
                >
                    <div className="flex flex-col gap-2 w-3/5">
                        <h3 className="text-lg font-bold">{categoria.categoriaNome}</h3>
                        <p className="text-zinc-600 text-sm">{categoria.categoriaDescricao}</p>
                    </div>
                    <div className="h-full w-0.5 bg-zinc-200"></div>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/publico/imagem/${categoria.categoriaImagem}`}
                        alt="Imagem da categoria"
                        width={115}
                        height={115}
                        className="object-contain rounded-xl"
                    />
                </button>
            ))}
        </div>
    )
}