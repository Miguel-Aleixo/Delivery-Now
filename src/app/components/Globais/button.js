"use client"

import { useRouter } from "next/navigation";

export function Button({
  label,
  onClick,
  type = "button",
  disabled = false,
  variante = "orange",
  style = "",
  path = '/',
  icon
}) {

  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      router.push(path);
    }
  };

  const base = "rounded-sm transition-all duration-300 flex items-center justify-center gap-2";
  const variantes = {
    blue: " p-2 bg-blue-500 font-normal text-white hover:bg-blue-600 cursor-pointer",
    orange: "bg-orange-400 text-white p-4 text-sm 2xl:text-md hover:bg-orange-500 hover:-translate-y-1 cursor-pointer",
    orange_2: "bg-orange-400 text-white p-3 2xl:p-4 font-semibold text-sm 2xl:text-base hover:bg-orange-500 hover:-translate-y-1 cursor-pointer",
    disabled: "bg-zinc-300 p-2 text-gray-500 font-normal cursor-not-allowed",
    gray: "bg-zinc-300 p-2 font-normal hover:bg-zinc-400 cursor-pointer",
    green: "bg-green-500 p-2 text-white font-normal hover:bg-green-600 cursor-pointer",
    transparent: "flex justify-start pl-10 text-zinc-100 p-2 hover:text-white hover:bg-zinc-600 w-full cursor-pointer rounded-none",
    buttonContinuarComprando: "bg-zinc-200 text-black p-4 text-sm 2xl:text-md hover:bg-green-600 hover:text-white hover:-translate-y-1 cursor-pointer",
    buttonMenuHomeDesktop: "flex justify-start gap-2 px-4 py-3 hover:bg-zinc-100 cursor-pointer"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${variantes[variante]} ${style} ${base} ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {icon && <span className="text-lg text-white">{icon}</span>}
      {label}
    </button>
  );
}
