import { apiFetchServer } from "@/app/api/apiFetchServer"
import { ListaProdutos } from "@/app/components/Private/produtos/listaProdutos"

export default async function ProdutosPage() {

    const lista = await apiFetchServer(`/publico/produto`, { auth: false })

    const json = await lista.json()
    console.log(json)

    return (
        <div className="px-12 py-12">
            <h1 className="text-black text-3xl md:text-4xl font-bold text-center md:text-left mb-8">Produtos</h1>
            <ListaProdutos lista={json} />
        </div>
    )
}
