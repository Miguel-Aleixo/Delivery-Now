export function Background() {
  return (
    <div
      className="w-1/2 h-full hidden md:block absolute right-0 top-0 overflow-hidden"
      style={{
        clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
        backgroundImage: "url('/imagem/fundo.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className="h-full  pl-25 lg:px-25 lg:pl-50 w-full flex flex-col justify-center items-center px-10 text-center text-white">
        <h2 className="text-2xl 2xl:text-3xl mb-4">Bem vindo(a) à nossa <span className="text-red-500 font-semibold">PIZZARIA</span></h2>
        <p className="mb-4 2xl:text-xl">
          Aqui o sabor é levado a sério. 🍕 Faça seu login e descubra um cardápio recheado de pizzas irresistíveis, promoções especiais e novidades quentinhas esperando por você.
        </p>
        <p className="text-2xl 2xl:text-3xl p-1 font-semibold animate-glow-solid">
          Seu momento de sabor começa agora!
        </p>

        <style jsx>{`
  @keyframes glow-solid {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0% 0;
    }
  }

  .animate-glow-solid {
    background-image: repeating-linear-gradient(
      to right,
      #facc15 0%,
      #ef4444 50%,
      #facc15 49.9%,
      #ef4444 99.9%,
      #facc15 100%
    );
    background-size: 200% 100%;
    background-position: 0% 0;
    background-repeat: no-repeat;

    background-clip: text;
    -webkit-background-clip: text;

    color: transparent;
    -webkit-text-fill-color: transparent;

    animation: glow-solid 5s linear infinite;
  }
`}</style>



      </div>
    </div>
  )
}