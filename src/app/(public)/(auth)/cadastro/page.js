'use client';

import { useState } from 'react';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { IMaskInput } from 'react-imask';
import { Input } from '@/app/components/Globais/input';
import { Button } from '@/app/components/Globais/button';
import { RedirectButton } from '@/app/components/Globais/RedirectButton';
import { Background } from '@/app/components/publico/Login_Cadastro/Background';

export default function Cadastro() {

    //Passo a Passo
    const [passo, setPasso] = useState(0);
    const irParaProximo = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setPasso(1);
    }

    const voltar = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setPasso(0);
    }

    //Realizar cadastro de usuario

    const [formData, setformData] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: ''
    })

    const handleFormEdit = (event, name) => {
        setformData({
            ...formData,
            [name]: event.target.value
        })
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/registro`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                console.error("Falha ao criar conta")
            }

            window.location.href = '/login'


        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section className="relative min-h-screen w-full flex flex-col md:flex-row justify-center md:justify-between items-center bg-white">
            <div className='w-1/2 flex flex-col justify-center items-center'>
                <div className="rounded-3xl relative z-10 p-7 py-10 bg-white font-semibold transition-all duration-300 overflow-hidden w-[350px] 2xl:w-[400px]">
                    <form className="relative 2xl:text-xl flex font-normal transition-transform duration-500">

                        <article className="w-full flex flex-col gap-5 2xl:gap-8">
                            <div className="text-center">
                                <h1 className="text-2xl 2xl:text-3xl">Criar sua conta agora</h1>
                            </div>

                            <div className='flex w-[700px] 2xl:w-[800px] transition-all duration-600' style={{ transform: `translateX(-${passo * 50}%)` }}>

                                {/* Tela 1*/}

                                <article className={`flex flex-col transition-all duration-200 mr-[53px] gap-5 2xl:gap-8 w-1/2 ${passo == 0 ? 'opacity-100' : 'opacity-0'}`}>
                                    <Input
                                        id="nome"
                                        label="Nome"
                                        placeholder="Seu nome..."
                                        icon={<UserIcon className="w-6 h-6" />}
                                        value={formData.nome}
                                        onChange={(e) => { handleFormEdit(e, 'nome') }}
                                        required={true}
                                    />

                                    <Input
                                        id="email"
                                        label="Email"
                                        placeholder="email@email.com"
                                        icon={<EnvelopeIcon className="w-6 h-6" />}
                                        value={formData.email}
                                        onChange={(e) => { handleFormEdit(e, 'email') }}
                                        required={true}
                                    />

                                    <div className="flex flex-col">
                                        <label htmlFor="telefone" className="mb-1">Telefone</label>
                                        <div className="flex items-center group bg-zinc-100 rounded-lg px-3 transition-all duration-300 hover:shadow-xl">
                                            <PhoneIcon className="w-6 h-6 transition-all duration-300 group-hover:text-blue-500"></PhoneIcon>
                                            <IMaskInput
                                                id="telefone"
                                                value={formData.telefone}
                                                mask="(00) 00000-0000"
                                                onAccept={(value) => handleFormEdit({ target: { value } }, 'telefone')}
                                                type="text"
                                                placeholder="(11) 11111-1111"
                                                className="bg-zinc-100 rounded-sm 2xl:py-5 py-4 px-4 w-full outline-none"
                                                overwrite
                                                required
                                            />
                                        </div>
                                    </div>
                                </article>

                                {/* Tela 2*/}

                                <article className={`flex flex-col gap-5 xl:gap-8 transition-all duration-200 w-1/2 mr-[53px] ${passo == 0 ? 'opacity-0' : 'opacity-100'}`}>
                                    <div className="flex flex-col">
                                        <div className="flex gap-1">
                                            <label htmlFor="endereco" className="mb-1">Endereço</label>
                                            <MapPinIcon className="w-6 h-6 "></MapPinIcon>
                                        </div>

                                        <div className="flex items-center group bg-zinc-100 rounded-lg px-3 transition-all duration-300 hover:shadow-xl mb-5">
                                            <textarea
                                                id="endereco"
                                                type="text"
                                                placeholder="Rua exemplo, Bairro exemplo, Número 999"
                                                className="bg-zinc-100 rounded-sm h-[160px] 2xl:h-[210px] py-2 w-full outline-none"
                                                required
                                            />
                                        </div>

                                        <Input
                                            id="senha"
                                            label="Senha"
                                            placeholder="Sua senha..."
                                            value={formData.senha}
                                            type="password"
                                            icon={<LockClosedIcon className="w-6 h-6" />}
                                            required={true}
                                            onChange={(e) => { handleFormEdit(e, 'senha') }}
                                        />

                                    </div>
                                </article>
                            </div>

                            <div>
                                {passo == 0 ? (
                                    <div className="flex flex-row gap-7 justify-center mt-2">
                                        <Button variante='disabled' label='Voltar' disabled={true} />
                                        <Button onClick={irParaProximo} variante='blue' label='Proximo' />
                                    </div>

                                ) : (
                                    <div className="flex flex-row gap-7 justify-center mt-2">
                                        <Button label='Voltar' variante='gray' onClick={voltar} />
                                        <Button label='Criar conta' variante='green' onClick={handleForm} />
                                    </div>

                                )}

                            </div>

                            <RedirectButton label={'Já tem conta ?'} textButton={'Entrar agora'} urlSend={'/login'} />
                        </article>
                    </form>
                </div>
            </div>

            <Background />
        </section>
    )
}