"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Header } from "@/app/components/Globais/header";
import { Inter } from "next/font/google";
import { Button } from "@/app/components/Globais/button";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { MenuLateral } from "@/app/components/publico/Home/MenuLateral";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function Carrinho() {
    const [pedidos, setPedidos] = useState([]);
    const [modalObs, setModalObs] = useState(null);

    const getTokenFromCookie = () => {
        const match = document.cookie.match(/(^| )token=([^;]+)/);
        return match?.[2];
    };


    useEffect(() => {
        const token = getTokenFromCookie();
        const fetchPedidos = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pedido-produto`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!response.ok) throw new Error("Erro ao buscar pedidos");
                const json = await response.json();
                setPedidos(json);

                console.log(json);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPedidos();
    }, []);

    const handleDeletarPizza = async (id) => {
        const token = getTokenFromCookie();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pedido-produto/${id}`, {
                method: 'DELETE',
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erro ao deletar pizza:", errorText);
                return;
            }

            setPedidos(prev => prev.filter(item => item.idPedidoProduto !== id));
        } catch (err) {
            console.error("Erro ao tentar deletar pizza:", err);
        }
    };

    return (
        <div className={`${inter.className} min-h-screen w-full md:bg-zinc-100 flex flex-col items-center`}>

            <MenuLateral numero={1} right={5} top={5} />

            <main className="w-full lg:max-w-[1200px] xl:max-w-[1600px] flex flex-col md:flex-row md:justify-between md:my-24">
                <div className="md:w-3/5 bg-white rounded-lg md:h-[700px] p-4 flex flex-col">
                    <h1 className="font-bold border-b-2 border-zinc-200 p-2">Produtos escolhidos</h1>

                    <div className="flex-1 md:overflow-y-auto md:pr-2">
                        {pedidos.length > 0 ? (
                            pedidos.map(item => (
                                <div
                                    key={item.idPedidoProduto}
                                    className="w-full bg-zinc-100 p-4 rounded-lg my-4 flex flex-col md:flex-row gap-4"
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/publico/imagem/${item.produto1Fk.produtoImagem}`}
                                        width={200}
                                        height={200}
                                        style={{ objectFit: 'contain' }}
                                        alt={`Imagem da pizza ${item.produto1Fk.produtoNome}`}
                                    />

                                    <div className="space-y-4">
                                        <h1 className="font-bold text-2xl">
                                            {item.produto1Fk.produtoNome}
                                            {item.produto2Fk ? ` + ${item.produto2Fk.produtoNome}` : ''}
                                        </h1>
                                        <p><span className="font-bold">Quantidade:</span> {item.quantidadePedidoProduto}</p>
                                        <p className="font-bold text-green-600 text-xl">
                                            <span className="text-black font-bold">R$:</span> {item.precoPedidoProduto}
                                        </p>
                                        <p><span className="font-bold">Descrição:</span> {item.produto1Fk.produtoDescricao}</p>
                                        <p><span className="font-bold">Observação:</span> {item.observacaoPedidoProduto || 'Nenhuma'}</p>

                                        <div className="w-full md:w-[150px]">
                                            <Button style="bg-red-400 hover:bg-red-600 w-full" label="Remover pizza" onClick={() => handleDeletarPizza(item.idPedidoProduto)} />
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full flex flex-col gap-10 justify-center items-center">
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1, y: [-15, 15] }}
                                    transition={{
                                        duration: 1, repeat: Infinity, ease: "easeInOut",
                                        repeatType: "mirror",
                                    }}
                                >
                                    <Image src={'/imagem/carrinho-vazio.png'} alt="Imagem de um carrinho vazio" height={400} width={400} />
                                </motion.div>
                                <p className="font-normal text-2xl text-orange-500 text-center">
                                    Seu carrinho está vazio! <br /> Que tal escolher uma delícia para começar sua experiência?
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <aside className="hidden md:block w-1/3 bg-white rounded-lg h-[700px] p-8 flex flex-col md:shadow-lg sticky top-10">
                    <div className="flex items-center gap-3 mb-8">
                        <FiShoppingCart className="text-3xl" />
                        <h2 className="text-2xl font-bold text-orange-500">Seu Carrinho</h2>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-lg font-medium text-zinc-700">Itens no carrinho:</span>
                        <span className="text-2xl font-bold text-orange-600">{pedidos.length}</span>
                    </div>
                    <div className="border-t border-zinc-200 my-4"></div>
                    <div className="flex flex-col gap-2 flex-1 md:overflow-y-auto">
                        {pedidos.length > 0 ? (
                            pedidos.map(item => (
                                <div key={item.idPedidoProduto} className="flex items-center gap-3 py-2">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/publico/imagem/${item.produto1Fk.produtoImagem}`}
                                        width={48}
                                        height={48}
                                        className="rounded"
                                        alt={item.produto1Fk.produtoNome}
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-zinc-800">{item.produto1Fk.produtoNome}{item.produto2Fk ? ` + ${item.produto2Fk.produtoNome}` : ''}</p>
                                        <p className="text-sm text-zinc-500">Qtd: {item.quantidadePedidoProduto}</p>
                                    </div>
                                    <span className="font-bold text-green-600">R$ {item.precoPedidoProduto}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-zinc-400 text-center mt-10">Nenhum item adicionado.</p>
                        )}
                    </div>
                    <div className="border-t border-zinc-200 my-4"></div>
                    {/* Valor total */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-medium text-zinc-700">Total:</span>
                        <span className="text-2xl font-bold text-green-600">
                            R$ {pedidos.reduce((acc, item) => acc + Number(item.precoPedidoProduto), 0).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button
                            label="Finalizar Pedido"
                            disabled={pedidos.length === 0}
                            onClick={() => {/* ação de finalizar pedido */ }}
                        />
                        <Button
                            label="Continuar comprando"
                            path="/"
                            variante="buttonContinuarComprando"
                        />
                    </div>
                </aside>

                <aside className="md:hidden bg-white p-6 border-t-1  flex flex-col sticky bottom-0">


                    {/* Valor total */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-medium text-zinc-700">Total:</span>
                        <span className="text-2xl font-bold text-green-600">
                            R$ {pedidos.reduce((acc, item) => acc + Number(item.precoPedidoProduto), 0).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button
                            label="Finalizar Pedido"
                            disabled={pedidos.length === 0}
                            onClick={() => {/* ação de finalizar pedido */ }}
                        />
                        <Button
                            label="Continuar comprando"
                            path="/"
                            variante="buttonContinuarComprando"
                        />
                    </div>
                </aside>
            </main>
        </div>
    );
}
