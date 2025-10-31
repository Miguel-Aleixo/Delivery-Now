export default function OptionSelect({ categoria }) {
    return (
        <option value={categoria.categoriaId} className="text-black font-semibold" >{categoria.categoriaNome}</option>
    )
}