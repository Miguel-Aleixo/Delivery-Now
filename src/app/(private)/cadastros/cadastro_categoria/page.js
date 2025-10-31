'use client'

import { Input } from "@/app/components/Globais/input";
import { useEffect, useState } from "react";
import { PhotoIcon } from '@heroicons/react/24/solid'
import { Button } from "@/app/components/Globais/button";
import { FaArrowLeft } from "react-icons/fa6";

export default function CadastroCategoria(urlImagem) {
    const getTokenFromCookie = () => {
        const match = document.cookie.match(/(^| )token=([^;]+)/);
        return match?.[2];
    };

    const [preview, setPreview] = useState(null);
    const [nomeArquivo, setNomeArquivo] = useState('Clique e selecione uma imagem ')
    const [imagem, setImagem] = useState(null);


    const [formData, setformData] = useState({
        categoriaNome: '',
        categoriaDescricao: '',
        categoriaImagem: urlImagem,
        categoriaStatus: 1
    })

    const handleFormEdit = (event, name) => {
        setformData(prev => ({
            ...prev,
            [name]: event.target.value
        }))
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const handleImg = async () => {
        try {
            if (!imagem) {
                console.error("Nenhuma imagem selecionada.");
                return null;
            }

            const formData = new FormData();
            formData.append("imagem", imagem);

            const token = getTokenFromCookie();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/imagem`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            const json = await response.json();
            console.log(response.status, json);

            return json.url;

        } catch (err) {
            console.error("Erro ao enviar imagem:", err);
            return null;
        }
    }

    //funcao
    const cadastrarCategoria = async (event) => {
        event.preventDefault();

        const urlJson = await handleImg();

        if (!urlJson) {
            console.log("Erro ao enviar imagem!");
            return;
        }
        const formDataFinal = {
            ...formData,
            categoriaImagem: urlJson
        };

        console.log(JSON.stringify(formDataFinal));

        try {
            const token = getTokenFromCookie();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formDataFinal)
            });

            if (response.ok) {
                window.location.href = '/dashboard/categorias'
            }
        } catch (err) {
            console.error("Erro ao cadastrar categoria:", err);
        }
    };


    return (
        <main className="flex flex-col min-h-screen justify-center items-center md:bg-zinc-200">
            <section className="w-full max-w-md bg-white trasition-all duration-300 md:shadow-sm md:rounded-xl md:hover:shadow-2xl p-8 mb-18 md:mb-0">
                <Button path="/dashboard" icon={<FaArrowLeft />} />
                <div className="text-center font-bold text-2xl py-4">Cadastro de categoria</div>

                <form className="flex flex-col gap-4" onSubmit={cadastrarCategoria}>
                    <section>
                        <Input required id="nome_categoria" label="Nome" placeholder="Nome da categoria" value={formData.categoriaNome} onChange={(e) => { handleFormEdit(e, 'categoriaNome') }} />
                    </section>

                    <section>
                        <div className="mb-1">
                            <label htmlFor="descricao_categoria">Descrição</label>
                        </div>
                        <div className="bg-zinc-100 rounded-md px-3 transition-all duration-300 hover:shadow-xl">
                            <textarea
                                id="descricao_categoria"
                                required
                                placeholder="Descrição da categoria"
                                className="bg-zinc-100 py-2 w-full outline-none"
                                rows={4}
                                value={formData.categoriaDescricao}
                                onChange={(e) => { handleFormEdit(e, 'categoriaDescricao') }}
                            />
                        </div>
                    </section>

                    <section>
                        <div className="flex flex-col">
                            <label htmlFor="imagem" className="mb-1">Imagem</label>

                            <label
                                htmlFor="imagem"
                                className="flex justify-between group items-center border-2 border-dashed bg-zinc-100 px-3 py-1.5 rounded-md cursor-pointer text-zinc-500 hover:shadow-xl transition-all duration-300"
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
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    setImagem(file);
                                    setPreview(URL.createObjectURL(file));
                                    setNomeArquivo(file.name);
                                }}
                            />
                        </div>
                    </section>

                    <button
                        type="submit"
                        className="bg-green-500 border border-zinc-300 cursor-pointer text-white p-3 mt-1 rounded-md transition-all duration-300 hover:opacity-90">
                        Cadastrar categoria
                    </button>
                </form>
            </section>
        </main>
    )
}
