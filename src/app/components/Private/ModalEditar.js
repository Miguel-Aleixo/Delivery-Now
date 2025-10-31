"use client";
import { useState, useEffect } from "react";
import { Input } from "../Globais/input";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function FormEditar({ tipo, id, dadosIniciais, onSubmit }) {

    const router = useRouter();

    const [formData, setFormData] = useState({});

    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);
    const [nomeArquivo, setNomeArquivo] = useState("Clique e selecione uma imagem");

    const getTokenFromCookie = () => {
        const match = document.cookie.match(/(^| )token=([^;]+)/);
        return match?.[2];
    };
    const token = getTokenFromCookie();

    useEffect(() => {
        if (!dadosIniciais) return;

        if (tipo === "produto") {
            setFormData({
                produtoNome: dadosIniciais.produtoNome || "",
                produtoPreco: dadosIniciais.produtoPreco || "",
                produtoDescricao: dadosIniciais.produtoDescricao || "",
                produtoImagem: dadosIniciais.produtoImagem || "",
                produtoStatus: dadosIniciais.produtoStatus ?? true,
                categoriaFk: dadosIniciais.categoriaFk || 27,
            });

            if (dadosIniciais.produtoImagem && typeof dadosIniciais.produtoImagem === "string") {
                setPreview(`${process.env.NEXT_PUBLIC_API_URL}/publico/imagem/${dadosIniciais.produtoImagem}`);
                setNomeArquivo(dadosIniciais.produtoImagem);
            }
        } else if (tipo === "categoria") {
            setFormData({
                categoriaNome: dadosIniciais.categoriaNome || "",
                categoriaDescricao: dadosIniciais.categoriaDescricao || "",
                categoriaImagem: dadosIniciais.categoriaImagem || "",
                categoriaStatus: dadosIniciais.categoriaStatus ?? 1,
            });

            if (dadosIniciais.categoriaImagem && typeof dadosIniciais.categoriaImagem === "string") {
                setPreview(`${process.env.NEXT_PUBLIC_API_URL}/publico/imagem/${dadosIniciais.categoriaImagem}`);
                setNomeArquivo(dadosIniciais.categoriaImagem);
            }
        }
    }, [dadosIniciais, tipo]);

    useEffect(() => {
        if (imagem) {
            const url = URL.createObjectURL(imagem);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [imagem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImg = async () => {
        if (!imagem) return null;
        try {
            const formDataImg = new FormData();
            formDataImg.append("imagem", imagem);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/imagem`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataImg,
            });

            if (!response.ok) return null;
            const json = await response.json();
            return json.url;
        } catch {
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let urlImagem = tipo === "produto" ? formData.produtoImagem : formData.categoriaImagem;

        if (imagem) {
            const uploadedUrl = await handleImg();
            if (!uploadedUrl) {
                alert("Erro ao enviar a imagem");
                return;
            }
            urlImagem = uploadedUrl;
        }

        let dataParaEnviar = {};

        if (tipo === "produto") {
            dataParaEnviar = {
                ...formData,
                produtoImagem: urlImagem,
                produtoPreco: parseFloat(formData.produtoPreco),
            };
        } else if (tipo === "categoria") {
            dataParaEnviar = {
                ...formData,
                categoriaImagem: urlImagem,
                categoriaStatus: formData.categoriaStatus ?? 1, // garante que esteja presente
            };
        } else {
            alert("Tipo inválido.");
            return;
        }

        try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}`;
            if (tipo === "produto") url += `/produto/${id}`;
            else if (tipo === "categoria") url += `/categoria/${id}`;

            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataParaEnviar),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }

            const data = await res.json();
            if (typeof onSubmit === "function") {
                onSubmit(data);
                router.refresh();
            }
        } catch (err) {
            alert("Erro ao editar: " + err.message);
        }
    };

    const renderInputs = () => {
        if (tipo === "produto") {
            return (
                <>
                    <Input label="Nome" name="produtoNome" value={formData.produtoNome || ""} onChange={handleChange} />
                    <Input
                        label="Preço"
                        name="produtoPreco"
                        type="number"
                        value={formData.produtoPreco || ""}
                        onChange={handleChange}
                    />
                    <Input label="Descrição" name="produtoDescricao" value={formData.produtoDescricao || ""} onChange={handleChange} />
                    <Input
                        label="Categoria"
                        name="categoriaFk"
                        type="number"
                        value={formData.categoriaFk || ""}
                        onChange={handleChange}
                    />
                    {renderUpload()}
                </>
            );
        } else if (tipo === "categoria") {
            return (
                <>
                    <Input label="Nome" name="categoriaNome" value={formData.categoriaNome || ""} onChange={handleChange} />
                    <Input
                        label="Descrição"
                        name="categoriaDescricao"
                        value={formData.categoriaDescricao || ""}
                        onChange={handleChange}
                    />
                    {renderUpload()}
                </>
            );
        }
        return <p className="text-red-500">Tipo inválido</p>;
    };

    const renderUpload = () => (
        <div className="flex flex-col">
            <label htmlFor="imagem" className="mb-1">
                Imagem
            </label>
            <label
                htmlFor="imagem"
                className="flex justify-between group items-center border-2 border-dashed bg-zinc-100 py-1.5 px-3 rounded-md cursor-pointer text-zinc-500 hover:shadow-xl transition-all duration-300"
            >
                {nomeArquivo}
                {preview ? (
                    <img src={preview} alt="Pré-visualização" className="w-20 h-20 object-cover rounded-md border" />
                ) : (
                    <PhotoIcon className="w-10 h-10 group-hover:text-blue-500 transition-all duration-300" />
                )}
            </label>
            <input
                id="imagem"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setImagem(file);
                    setNomeArquivo(file.name);
                }}
            />
        </div>
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 border rounded-lg shadow bg-white max-w-lg w-full"
        >
            <h2 className="text-xl font-semibold capitalize">Editar {tipo}</h2>
            {renderInputs()}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Salvar Alterações
            </button>
        </form>
    );
}
