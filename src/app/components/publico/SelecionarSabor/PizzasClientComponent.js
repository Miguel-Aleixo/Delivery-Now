import Image from "next/image";

import { useEffect } from "react";

export function PizzaClientComponent({
    pizza,
    setProdutoSelecionado,
    produtoSelecionado,
    maximoDeProdutos,
}) {

    const SaborDePizzaSelecionado = () => {
        setProdutoSelecionado(prev => {
            const isSelected = prev.some(item => item.produtoId === pizza.produtoId);

            if (isSelected) {
                return prev.filter(item => item.produtoId !== pizza.produtoId);
            }

            if (prev.length >= maximoDeProdutos) {
                return [...prev.slice(1), { produtoId: pizza.produtoId }];
            }

            return [...prev, { produtoId: pizza.produtoId }];
        });
    };

    // 💡 Monitoramos o estado para garantir que a UI reflita as mudanças corretamente
    useEffect(() => {
        console.log("ProdutoSelecionado atualizado:", produtoSelecionado);
    }, [produtoSelecionado]);

    return (
        <div
            onClick={SaborDePizzaSelecionado}
            className="relative p-2 border-b-2 cursor-pointer  md:border-none md:hover:-translate-y-1 transition-all duration-300 md:shadow-sm md:hover:shadow-md md:p-5 md:rounded-md md:gap-10 border-gray-300 flex justify-between items-center"
        >
            <div className="flex flex-col items-start gap-2 w-3/4 md:justify-between md:h-full">
                <h2 className="text-xl font-semibold">{pizza.produtoNome}</h2>
                <p className="text-gray-600 text-sm text-start w-3/4">
                    {pizza.produtoDescricao}
                </p>
                <p className="text-lg font-bold text-green-600">
                   R$ {pizza.produtoPreco?.toFixed(2)}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/publico/imagem/${pizza.produtoImagem}`}
                    alt={`Imagem da pizza ${pizza.produtoNome}`}
                    height={120}
                    width={120}
                    className="object-cover"
                />
                <input
                    type="checkbox"
                    readOnly
                    checked={
                        produtoSelecionado.some(item => item.produtoId === pizza.produtoId)
                    }
                    className="rounded-lg h-8 w-8 border-yellow-600"
                    onChange={SaborDePizzaSelecionado}
                />
            </div>
        </div>
    );
}