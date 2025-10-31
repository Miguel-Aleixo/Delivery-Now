
import { apiFetchServer } from "@/app/api/apiFetchServer";
import { ListaCategorias } from "@/app/components/Private/categorias/listaCategoria";

export default async function CategoriasPage() {
    const lista = await apiFetchServer(`/publico/categoria`, { auth: false });
    const json = await lista.json();

    return (
        <div className="px-12 py-12">
            <h1 className="text-black text-3xl md:text-4xl font-bold text-center md:text-left mb-8">Categorias</h1>
            <ListaCategorias lista={json} />
        </div>
    );
}
