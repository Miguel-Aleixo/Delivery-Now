import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Input } from "@/app/components/Globais/input";
import { Button } from "@/app/components/Globais/button";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ['latin'], weight: ['400'] })

export default async function UserPage() {

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    let role;
    let nome;
    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
        nome = decoded.nome;
    }

    return (
        <>
            {token ? (
                <div className={`${inter.className} w-full md:bg-zinc-100 flex justify-center`}>
                    <div className="bg-white md:shadow-lg md:rounded-3xl w-full md:w-1/2 h-full md:mx-20 md:my-10 gap-8 flex flex-col p-8 justify-between">

                        <div className="flex flex-col md:p-8 rounded-xl items-center w-full">
                            <div className="w-full ">
                            </div>
                            <div className="bg-zinc-200 rounded-full p-4">
                                <UserIcon className="h-10 w-10 2xl:h-12 2xl:w-12" />
                            </div>
                            <h2 className="text-2xl font-bold text-center">Olá, {nome} 👋</h2>
                            <p className="text-gray-600 text-sm text-center">
                                "Aqui você encontra um resumo do seu perfil e dos seus pedidos recentes. Aproveite sua experiência!"
                            </p>

                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-1 w-full">
                                    <Input Defaultvalue={nome} label="Nome" icon={<UserIcon className="w-6 h-6" />} />
                                    <Input Defaultvalue="admin@email.com" label="E-mail" type="email" icon={<EnvelopeIcon className="w-6 h-6" />} />
                                    <Input Defaultvalue="********" label="Senha" type="password" icon={<LockClosedIcon className="w-6 h-6" />} />
                                </div>
                                <Button variante="orange_2" label="Editar perfil" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 bg-white md:px-8 rounded-lg">
                            <h3 className="text-xl text-center font-bold text-black">PEDIDOS RECENTES</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { nome: 'Pizza Calabresa', data: '05/06/2025' },
                                    { nome: 'Pizza Marguerita', data: '02/06/2025' },
                                    { nome: 'Pizza Quatro Queijos', data: '28/05/2025' },
                                ].map((pedido, index) => (
                                    <div key={index} className="bg-zinc-100 p-3 2xl:p-4 flex justify-between rounded-md items-center">
                                        <span>{pedido.nome}</span>
                                        <span className="text-sm text-gray-600">{pedido.data}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <p className="text-center mt-10 text-gray-500">
                    Informações do usuário não encontradas
                </p>
            )}
        </>
    );

}
