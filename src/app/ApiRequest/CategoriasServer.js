import { apiFetchServer } from "@/app/api/apiFetchServer";
import { CategoriasClientComponent } from "../components/publico/Home/CategoriasClientComponent";

export async function CategoriasServer() {
    const res = await apiFetchServer('/publico/categoria', { auth: false });
    const data = await res.json();

    return <CategoriasClientComponent data={data} />;
}

