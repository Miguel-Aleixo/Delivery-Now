
import { CarouselItem } from "@/components/ui/carousel"

// Sem carrosel para telas maiores

export function Items({ select, value, itemSelecionado, Text }) {
    return (
        <div
            onClick={itemSelecionado}
            className={`relative p-1 rounded-lg px-2 cursor-pointer !flex-none transition-all duration-100 ${select == value ? "font-bold bg-orange-400 text-white" : ""}
            ${select !== value ? "hover:text-orange-400 hover:after:w-full after:w-0 after:h-[2px] after:absolute after:bottom-0 after:left-0 after:bg-orange-400 after:transition-all after:duration-300" : ""}`}
        >
            {Text}
        </div>
    )
}

// Com carrosel para telas menores

export function Items_Carousel({ select, value, itemSelecionado, Text }) {
    return (
        <CarouselItem
            onClick={itemSelecionado}
            className={`relative p-1 rounded-lg px-2 cursor-pointer !flex-none transition-all duration-100 ${select == value ? "font-bold bg-orange-400 text-white" : ""}
            ${select !== value ? "hover:opacity-80 hover:after:w-full after:w-0 after:h-[2px] after:absolute after:bottom-0 after:left-0 after:bg-orange-400 after:transition-all after:duration-300" : ""}`}
        >
            {Text}
        </CarouselItem>
    )
}