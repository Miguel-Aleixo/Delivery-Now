'use client'

import { useState, useEffect } from "react"
import { Input } from "@/app/components/Globais/input";
import { PhotoIcon } from '@heroicons/react/24/solid'
import { Button } from "@/app/components/Globais/button";
import { FaArrowLeft } from "react-icons/fa6";

export default function CadastroProduto() {
    const [loading, setLoading] = useState(false);

    const [preview, setPreview] = useState(null);
    const [nomeArquivo, setNomeArquivo] = useState('Clique e selecione uma imagem');
    const [imagem, setImagem] = useState(null);

    const [formData, setformData] = useState({
        produtoNome: '',
        produtoPreco: '',
        produtoDescricao: '',
        produtoImagem: '',
        categoriaFk: 27,
        produtoStatus: 1
    });

    function formatarPreco(valor) {
        const apenasNumeros = valor.replace(/[^\d]/g, '');
        if (apenasNumeros) {
            const valorFormatado = (parseFloat(apenasNumeros) / 100).toFixed(2);
            return valorFormatado.replace('.', ',');
        }
        return '';
    }

    const getTokenFromCookie = () => {
        const match = document.cookie.match(/(^| )token=([^;]+)/);
        return match?.[2];
    };

    const handleFormEdit = (event, name) => {
        let value = event.target.value;
        if (name === 'categoriaFk') {
            value = Number(value);
        }
        setformData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (imagem) {
            const url = URL.createObjectURL(imagem);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [imagem]);

    const handleImg = async () => {
        if (!imagem) return null;
        try {
            const formDataImg = new FormData();
            formDataImg.append("imagem", imagem);

            const token = getTokenFromCookie();

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/imagem`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataImg
            });

            if (!response.ok) return null;
            const json = await response.json();
            return json.url;
        } catch (err) {
            return null;
        }
    }

    const cadastrarProduto = async (event) => {
        event.preventDefault();

        if (!formData.produtoNome || !formData.produtoPreco || !formData.produtoDescricao || !imagem || !formData.categoriaFk) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const urlJson = await handleImg();
        if (!urlJson) {
            alert("Erro ao enviar imagem!");
            return;
        }

        const formDataFinal = {
            ...formData,
            produtoImagem: urlJson,
            produtoPreco: parseFloat(formData.produtoPreco.replace(',', '.'))
        };

        try {
            const token = getTokenFromCookie();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formDataFinal)
            });

            if (response.ok) {
                setLoading(true);
                setTimeout(() => {
                    window.location.href = '/dashboard/produtos';
                }, 200);
            } else {
                alert("Erro ao cadastrar produto!");
            }
        } catch (err) {
            alert("Erro ao cadastrar produto!");
        }
    };

    return (
        <main className="flex flex-col min-h-screen justify-center items-center md:bg-zinc-200">
            <section className="w-full max-w-md bg-white transition-all duration-300 md:shadow-sm md:rounded-xl md:hover:shadow-2xl p-6 mb-13 md:mb-0">
                <Button path="/dashboard" icon={<FaArrowLeft />} />
                <div className="text-center font-bold text-2xl py-4">Cadastro de produto</div>
                <form className="flex flex-col gap-4" onSubmit={cadastrarProduto}>
                    <Input
                        required
                        id="nome_produto"
                        label="Nome"
                        placeholder="Nome do produto"
                        value={formData.produtoNome}
                        onChange={e => handleFormEdit(e, 'produtoNome')}
                    />
                    <Input
                        required
                        id="descricao_produto"
                        label="Descrição"
                        placeholder="Descrição do produto"
                        value={formData.produtoDescricao}
                        onChange={e => handleFormEdit(e, 'produtoDescricao')}
                    />
                    <Input
                        id="preco"
                        type="text"
                        label="Preço"
                        value={formData.produtoPreco}
                        onChange={e => {
                            const precoFormatado = formatarPreco(e.target.value);
                            setformData(prev => ({
                                ...prev,
                                produtoPreco: precoFormatado
                            }));
                        }}
                        required
                        placeholder="0,00"
                    />
                    <section>
                        <div className="flex flex-col">
                            <label htmlFor="imagem" className="mb-1">Imagem</label>
                            <label
                                htmlFor="imagem"
                                className="flex justify-between group items-center border-2 border-dashed bg-zinc-100 py-1.5 px-3 rounded-md cursor-pointer text-zinc-500 hover:shadow-xl transition-all duration-300"
                            >
                                {nomeArquivo}
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Pré-visualização"
                                        className="w-20 h-20 object-cover rounded-md border"
                                    />
                                ) : (
                                    <PhotoIcon className="w-10 h-10 group-hover:text-blue-500 transition-all duration-300 object-cover rounded-md " />
                                )}
                            </label>
                            <input
                                id="imagem"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    setImagem(file);
                                    setNomeArquivo(file.name);
                                }}
                            />
                        </div>
                    </section>
                    <button
                        type="submit"
                        className="bg-green-500 border border-zinc-300 cursor-pointer text-white p-3 mt-1 rounded-md transition-all duration-300 hover:opacity-90">
                        Cadastrar produto
                    </button>
                </form>
            </section>

            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-black text-xl font-bold animate-pulse">
                        Carregando...
                    </div>
                </div>
            )}
        </main>
    )
}