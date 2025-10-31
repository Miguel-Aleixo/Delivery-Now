"use client";

import { useState } from "react";

export function ButtonDelete({ id, path, onDelete }) {

    const getTokenFromCookie = () => {
        const match = document.cookie.match(/(^| )token=([^;]+)/);
        return match?.[2];
    };

    const handleDeletar = async () => {
        const token = getTokenFromCookie();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}${id}`, {
                method: 'DELETE',
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.log(errorText)
                return;
            }

            onDelete();
        } catch (err) {
            console.error("Erro ao tentar deletar", err);
        }
    };

    return (
        <>
            <button
                onClick={handleDeletar}
                className="px-4 py-2 bg-red-600 text-white rounded text-base font-medium
                hover:-translate-y-1 hover:bg-red-900 transition-all duration-300 cursor-pointer"
                type="button"
            >
                Remover
            </button>
        </>
    );
}
