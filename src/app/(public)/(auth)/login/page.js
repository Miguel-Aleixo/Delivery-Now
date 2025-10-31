'use client';

import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { RedirectButton } from '@/app/components/Globais/RedirectButton';
import { Input } from '@/app/components/Globais/input';
import { Background } from '@/app/components/publico/Login_Cadastro/Background';
import { Button } from '@/app/components/Globais/button';
import Cookies from 'js-cookie';

export default function Login() {

    const [formData, setformData] = useState({
        email: '',
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const json = await response.json();

            console.log(response.status);
            console.log(json.role);

            if (response.ok && json.token) {

                Cookies.set('token', json.token);

                if (json.role === "ADMINISTRADOR") {
                    window.location.href = '/dashboard'
                }

                if (json.role === "USUARIO") {
                    window.location.href = '/'
                }

            } else {
                alert("Erro ao fazer login: " + json.message);
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="relative min-h-screen w-full md:flex-col flex justify-center">
            <div className='md:w-1/2 flex justify-center items-center'>
                <div className="rounded-3xl transition-all duration-300 bg-white p-7 py-10 overflow-hidden w-[350px] 2xl:w-[400px]">
                    <form onSubmit={handleForm}>
                        <article className="flex flex-col gap-5 2xl:gap-8 2xl:text-xl">
                            <div className="text-center">
                                <h1 className="text-2xl 2xl:text-3xl">Faça login</h1>
                            </div>

                            <Input
                                id="email"
                                label="Email"
                                value={formData.email}
                                placeholder="email@email.com"
                                icon={<EnvelopeIcon className="w-6 h-6" />}
                                required={true}
                                onChange={(e) => { handleFormEdit(e, 'email') }}
                            />

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

                            <div className="flex flex-row gap-7 justify-center mt-2">
                                <Button style='w-full' label='Entrar' variante='blue' type="submit" />
                            </div>

                            <RedirectButton label={'Não tem conta ?'} textButton={'Criar agora'} urlSend={'/cadastro'} />
                        </article>
                    </form>
                </div>
            </div>

            <Background />

        </section>
    )
}