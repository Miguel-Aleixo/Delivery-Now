import { useRouter } from "next/navigation"

export function RedirectButton({ textButton, urlSend, label }) {

    const router = useRouter();

    return (
        <div className="flex gap-1 items-center 2xl:text-lg font-normal justify-center mt-4 text-sm">
            <span>{label}</span>
            <button type="button" onClick={() => router.push(urlSend)} className="relative cursor-pointer text-blue-600 after:transition-all after:duration-100 hover:after:w-full after:w-0 after:h-[1px] after:bg-blue-600 after:absolute after:left-0 after:bottom-0 " >
                {textButton}</button>
        </div >
    )
}