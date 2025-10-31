'use client'

// hooks default
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

// hooks criados
import { usePizzas } from "@/app/ApiRequest/RequestClientPizza";

// fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: "400" });

// Icons
import { ArrowLeftIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

// components default
import Image from "next/image";

// components criados
import { Loading } from "@/app/components//publico/SelecionarSabor/loading";
import { PizzaClientComponent } from "@/app/components/publico/SelecionarSabor/PizzasClientComponent.js";

export default function TelaSelecionarSabor() {

    // --- Hooks ---
    const { pizzas } = usePizzas();
    const params = useParams();
    const router = useRouter();
    const [count, setCount] = useState(1);
    const [produtoSelecionado, setProdutoSelecionado] = useState([]);

    // Lógica para determinar o limite de seleções baseado no 'id' da URL
    const maximoSelecoes = params.id === '1' ? 1 : params.id === '2' ? 2 : 1;

    const handleDecrease = () => count > 1 && setCount(prev => prev - 1);
    const handleIncrease = () => setCount(prev => prev + 1);

    const [formData, setFormData] = useState({
        PedidoProdutoQuantidade: 1,
        PedidoProdutoObservacao: '',
        pedidoFk: 1,
        produto1Fk: produtoSelecionado[0]?.produtoId,
        produto2Fk: produtoSelecionado[1]?.produtoId
    })

    const Observacao = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            produto1Fk: produtoSelecionado.length > 0 ? produtoSelecionado[0].produtoId : null,
            produto2Fk: produtoSelecionado.length > 1 ? produtoSelecionado[1].produtoId : null
        }));
    }, [produtoSelecionado]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            PedidoProdutoQuantidade: count
        }));
    }, [count]);

    const SendPedido = async () => {
        console.log("Dados enviados: ", JSON.stringify(formData));

        try {
            const match = document.cookie.match(/(^| )token=([^;]+)/);
            const token = match?.[2];

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pedido-produto`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                console.log("Erro na request: ", response.status)

                console.log(JSON.stringify(produtoSelecionado));
            } else {
                const json = await response.json();
                console.log("Pedido enviado: ", json)
                router.push('/carrinho');
            }

        } catch (err) {
            console.error(err)
        }
    }


    if (!pizzas) return <Loading />;

    return (
        <main className={`${inter.className} w-full min-h-screen`}>
            {/* Header */}
            <header className="fixed top-0 z-10 w-full p-4 bg-white shadow-md flex justify-between items-center">
                <ArrowLeftIcon
                    onClick={() => router.push('/')}
                    className="h-8 w-8 text-yellow-400 font-bold cursor-pointer active:text-zinc-400 active:scale-90 transition-transform"
                />
                <h1 className="text-lg">Escolha os sabores</h1>
            </header>


            {/* Conteúdo principal */}
            <section className="flex flex-col md:pt-20 md:p-10 md:gap-10 md:bg-zinc-50">
                {/* Banner */}
                <div className="w-full flex justify-center">
                    <div className="relative flex justify-center items-center max-h-[300px] max-w-[1600px] overflow-hidden md:rounded-2xl">
                        <Image
                            src="/imagem/fundo_telaSelecionarSabor.webp"
                            alt="Imagem de uma pizza"
                            height={300}
                            width={500}
                            className="object-cover md:hidden"
                        />
                        <Image
                            src="/imagem/pizza.webp"
                            alt="Imagem de uma pizza"
                            height={300}
                            width={1600}
                            className="object-contain hidden md:block"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-95" />
                        <h1 className="absolute md:bottom-4 md:left-4 text-xl md:text-2xl font-bold text-white">
                            Ateliê Pizzas e Pães Caseiros
                        </h1>
                    </div>
                </div>

                {/* Lista de pizzas + Lado direito */}
                <div className="w-full flex justify-center">
                    <div className="md:flex w-full md:max-w-[1600px] gap-5">
                        {/* Lista de sabores */}
                        <div className="flex flex-col items-center w-full md:bg-white md:rounded-2xl md:rounded-br-2xl md:shadow-lg relative z-1">
                            <div className="w-full md:p-4 md:max-w-[1200px]">
                                {/* Cabeçalho da lista */}
                                <div className="flex justify-between items-center p-2 bg-zinc-200 md:bg-white md:rounded-t-2xl">
                                    <h2 className="font-semibold md:text-xl">Selecionar sabor</h2>
                                    <span className="text-white bg-red-600 px-3 py-1 rounded-xl text-sm md:text-md">
                                        Obrigatório
                                    </span>
                                </div>

                                {/* Grid de sabores */}
                                <div className="grid gap-4 p-4 grid-cols-1 pb-[280px] md:pb-0">
                                    {pizzas.map((pizza) => (
                                        <PizzaClientComponent
                                            key={pizza.produtoId}
                                            pizza={pizza}
                                            setProdutoSelecionado={setProdutoSelecionado}
                                            produtoSelecionado={produtoSelecionado}
                                            maximoDeProdutos={maximoSelecoes}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lado direito: observações e botão */}
                        <div className="w-full md:max-w-[400px]">
                            <footer
                                style={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                className="bg-zinc-200 fixed bottom-0 w-full z-50 md:sticky md:top-20 md:bg-white md:rounded-2xl border-t-1 border-zinc-400 md:border-none p-4 flex flex-col gap-4"
                            >
                                <div>
                                    <h2 className="text-lg text-black md:font-bold md:my-3">Observações</h2>
                                    <textarea
                                        onChange={(e) => Observacao(e, 'PedidoProdutoObservacao')}
                                        className="w-full h-20 p-2 rounded-lg border-2 border-zinc-400 focus:border-green-600 focus:outline-none"
                                        placeholder="Ex: Sem cebola, sem orégano, sem azeitona etc..."
                                    />
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <MinusIcon
                                            onClick={handleDecrease}
                                            className="h-10 w-10 p-2 bg-zinc-300 text-black rounded-lg cursor-pointer active:scale-95 transition-transform"
                                        />
                                        <span className="text-lg">{count}</span>
                                        <PlusIcon
                                            onClick={handleIncrease}
                                            className="h-10 w-10 p-2 bg-green-600 text-white rounded-lg cursor-pointer active:scale-95 transition-transform"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={SendPedido}
                                    className="w-full bg-green-600 text-white p-3 rounded-lg font-bold  md:hover:-translate-y-1 cursor-pointer active:scale-95 transition-all duration-300"
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );


}