"use client"

import { useState } from "react";
import { Items, Items_Carousel } from "../../Private/Carrinho/MenuComponent.js/carrousel_item";
import {
    Carousel,
    CarouselContent,
} from "@/components/ui/carousel"

// Sem carrosel para telas maiores

export function MenuComponent() {
    const [Selecionado, setSelecionado] = useState(0);
    function itemSelecionado(num) {
        setSelecionado(num);
    }

    return (
        <section className="mr-7 hidden md:block">
            <div className="flex gap-2 relative top-5 left-5">
                <Items select={Selecionado} value={1} itemSelecionado={() => itemSelecionado(1)} Text={'Pizza'} />
                <Items select={Selecionado} value={2} itemSelecionado={() => itemSelecionado(2)} Text={'Calzones'} />
                <Items select={Selecionado} value={3} itemSelecionado={() => itemSelecionado(3)} Text={'Beirutes'} />
                <Items select={Selecionado} value={4} itemSelecionado={() => itemSelecionado(4)} Text={'Mini Calzones'} />
                <Items select={Selecionado} value={5} itemSelecionado={() => itemSelecionado(5)} Text={'Bebidas'} />
            </div>
        </section>
    );
}

// Com carrosel para telas menores

export function MenuComponentCarousel() {
    const [Selecionado, setSelecionado] = useState(0);
    function itemSelecionado(num) {
        setSelecionado(num);
    }

    return (
        <Carousel className="md:hidden mt-5 w-2/2">
            <CarouselContent className='flex pl-4 gap-2'>
                <Items_Carousel select={Selecionado} value={1} itemSelecionado={() => itemSelecionado(1)} Text={'Pizza'} />
                <Items_Carousel select={Selecionado} value={2} itemSelecionado={() => itemSelecionado(2)} Text={'Calzones'} />
                <Items_Carousel select={Selecionado} value={3} itemSelecionado={() => itemSelecionado(3)} Text={'Beirutes'} />
                <Items_Carousel select={Selecionado} value={4} itemSelecionado={() => itemSelecionado(4)} Text={'Mini Calzones'} />
                <Items_Carousel select={Selecionado} value={5} itemSelecionado={() => itemSelecionado(5)} Text={'Bebidas'} />
            </CarouselContent>
        </Carousel>
    );
}