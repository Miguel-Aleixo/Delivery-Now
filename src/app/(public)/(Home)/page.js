//Icons
import { MagnifyingGlassIcon, UserIcon, MapPinIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
//Fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: "400" });
//Components
import Image from "next/image";
import { MenuLateral } from "@/app/components/publico/Home/MenuLateral";
import { Button } from "@/app/components/Globais/button";
import { VisualCardHome } from "@/app/components/publico/Home/visualCardHome";
import { Footer } from "@/app/components/Globais/footer";
import { MenuComponent, MenuComponentCarousel } from "@/app/components/publico/Home/menuComponent";
import { CategoriasServer } from "@/app/ApiRequest/CategoriasServer";


export default async function TelaHome() {
  return (

    <div className={`${inter.className}`}>
      <div className="2xl:p-4 px-6 overflow-hidden space-y-8 w-full flex flex-col justify-center items-center">

        <MenuLateral numero={0} right={5} top={5} />

        {/* Informações de horário e local */}
        <div className="flex justify-between items-center p-3 mt-3 bg-zinc-100 rounded-lg w-full lg:max-w-[1200px] xl:max-w-[1600px]">
          <p className="text-sm 2xl:text-lg">
            Horário: <span className="font-bold">18:00 - 23:30</span>
          </p>
          <span className="text-sm 2xl:text-lg font-bold text-orange-400">
            Santa Rita do Oeste
          </span>
        </div>

        {/*Home desktop*/}
        <div className="hidden lg:flex h-fit justify-between items-center w-full max-w-[1200px] xl:max-w-[1600px]">

          <div className="w-1/3 space-y-6">
            <h1 className="text-3xl xl:text-5xl font-bold w-3/4">A pizza mais <span className="text-orange-400">saborosa</span> da sua cidade</h1>
            <p className="text-zinc-600">A Ateliê Pizzas une sabor e tradição com um cardápio irresistível. Venha experimentar pizzas artesanais feitas com ingredientes frescos e massa especial.</p>
            <Button label='Fazer pedido' variante="orange" />
          </div>

          <div className="bg-orange-50 p-4 rounded-full flex justify-center items-center">
            <Image
              src={'/imagem/pizza_home.webp'}
              alt="Uma imagem de pizza"
              height={500}
              width={500}
              style={{ objectFit: 'contain', transform: 'rotate(-20deg)' }}
            />
          </div>

          <div className="space-y-4">
            <VisualCardHome Icon={UserIcon} texto={'Logou'} />

            <VisualCardHome Icon={ShoppingBagIcon} texto={'Pediu'} />

            <VisualCardHome Icon={MapPinIcon} texto={'Chegou'} />
          </div>

        </div>

        {/* Promoção */}
        <section className="w-full my-4 h-40 bg-white rounded-xl shadow-2xl flex justify-between border-black lg:hidden">
          <div className="p-4 flex flex-col justify-between">
            <p className="p-2 bg-orange-400 rounded-md text-xs text-center text-white font-bold">Promoção</p>
            <div>
              <h1 className="font-bold text-lg">Dose dupla.</h1>
              <p className="text-sm text-zinc-400">2 pizzas de calabresa</p>
            </div>
            <p className="text-orange-400 font-bold text-lg">R$ 60,00</p>
          </div>
          <div className="h-full w-2/5 bg-orange-400 rounded-xl flex justify-center items-center relative">
            <Image
              src={'/imagem/pizza.webp'}
              alt="Pizza"
              width={150}
              height={150}
              className="object-contain rounded-xl right-8 absolute"
            />
            <Image
              src={'/imagem/pizza.webp'}
              alt="Pizza"
              width={150}
              height={150}
              className="object-contain rounded-xl z-50"
            />
          </div>
        </section>

        {/* Campo de busca */}
        <section className="w-full flex justify-between items-center lg:max-w-[1200px] xl:max-w-[1600px]">

          <div className="space-y-2 w-1/3 hidden md:block">
            <h1 className="text-black hidden md:block">Busque a melhor opção pra você</h1>
            <div className="flex items-center gap-2 h-fit p-2 bg-zinc-100 rounded-xl shadow-md w-full">
              <MagnifyingGlassIcon className="h-12 w-12 text-black bg-zinc-200 rounded-lg p-2" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Menu */}
          <MenuComponent />
          <MenuComponentCarousel />

        </section>

        {/* Opções de pizza */}
        <section className="flex flex-col gap-4 justify-center pb-10 md:w-3/5">

          <h1 className="font-bold text-3xl text-center">VEJA NOSSAS OPÇÕES!</h1>

          <CategoriasServer />

        </section>
      </div>

      {/* Footer */}
      <Footer />


    </div >
  );
}
