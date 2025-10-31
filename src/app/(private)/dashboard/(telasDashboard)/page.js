import { apiFetchServer } from "@/app/api/apiFetchServer"
import { Button } from "@/app/components/Globais/button";

export default async function CategoriasPage() {
    const resCategoria = await apiFetchServer('/publico/categoria', { auth: false });
    const dataCategoria = await resCategoria.json();

    const resProduto = await apiFetchServer('/publico/produto', { auth: false });
    const dataProduto = await resProduto.json();

    return (
        <div className="px-6 md:px-12 py-12 flex flex-col gap-8">
            <h1 className="text-black text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">Visão Geral</h1>

            {/* Resumo dos Pedidos */}
            <section className="bg-white w-full py-6 px-6 md:px-14 rounded-2xl shadow flex flex-col md:flex-row justify-between gap-6 text-center text-xl font-bold">
                <div className="flex flex-col items-center gap-2 flex-1">
                    <p>Pedidos Recebidos</p>
                    <div className="p-2 px-4 rounded-lg text-yellow-500 text-xl">
                        8
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 flex-1">
                    <p>Em Preparo</p>
                    <div className="p-2 px-4 rounded-lg text-red-500 text-xl">
                        10
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 flex-1">
                    <p>Finalizados</p>
                    <div className="p-2 px-4 rounded-lg text-green-500 text-xl">
                        4
                    </div>
                </div>
            </section>

            {/* Seções de Categorias e Produtos */}
            <section className="w-full flex flex-col md:flex-row gap-6">
                <div className="bg-white w-full md:w-1/2 rounded-2xl shadow p-10 items-center justify-center text-xl ">
                    <div className="text-center font-bold flex flex-col gap-4">
                        <div className="flex flex-col gap-4 bg-zinc-50 rounded-2xl p-4">
                            <p>Categorias</p>
                            <div className="text-red-500">
                                2
                            </div>
                        </div>
                        <Button label={'Nova categoria'} path='/cadastros/cadastro_categoria' />
                    </div>
                </div>

                <div className="bg-white w-full md:w-1/2 rounded-2xl shadow p-10 items-center justify-center text-xl">
                    <div className="text-center font-bold flex flex-col gap-4">
                        <div className="flex flex-col gap-4 bg-zinc-50 rounded-2xl p-4">
                            <p>Produtos</p>
                            <div className="text-red-500">
                                5
                            </div>
                        </div>
                        <Button label={'Novo produto'} path='/cadastros/cadastro_produto' />
                    </div>
                </div>
            </section>
        </div>
    );

}
