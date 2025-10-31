import { apiFetchServer } from "@/app/api/apiFetchServer"
import { MenuLateralDashboard } from "../../../../components/Private/menuLateralDashboard";

export default async function PedidosPage() {
    const res = await apiFetchServer('/publico/pedido', { auth: false });
    const data = await res.json();

    return (
        <div className="w-full flex justify-between">

            <MenuLateralDashboard />

            <ul className="mr-28">
                <h1 className="text-black text-4xl mb-4">Pedidos</h1>
                {data.map((pedido) => (
                    <li key={pedido.id} className="text-black text-2xl">
                        {pedido.pedidoNome}
                    </li>
                ))}
            </ul>
        </div>
    )
}