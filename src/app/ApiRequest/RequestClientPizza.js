'use client'

import { useEffect, useState } from "react";

export function usePizzas() {
    const [pizzas, setPizzas] = useState();

    useEffect(() => {
        const buscarPizzas = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publico/produto`);
                if (!response.ok) throw new Error("Erro ao buscar dados");
                const dados = await response.json();
                setPizzas(dados);
            } catch (err) {
                console.error(err);
            }
        };

        buscarPizzas();
    }, []);

    return { pizzas };
}