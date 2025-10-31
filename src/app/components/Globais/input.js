
export function Input({ id, name, label, placeholder, icon, type = 'text', value, onChange, required = false, className = '' }) {
    return (
        <div className="flex flex-col font-normal">
            <label htmlFor={id} className="mb-1">{label}</label>
            <div className={`flex items-center group bg-zinc-100 rounded-lg transition-all duration-300 hover:shadow-xl ${icon == null || undefined ? '' : 'px-3'}`}>
                {icon == null || undefined ? (
                    <div className="hidden"></div>
                ) : (
                    <div className="text-black group-hover:text-blue-500 transition-all duration-300">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    name={name}
                    className="rounded-sm 2xl:py-5 py-4 px-4 w-full outline-none"
                />
            </div>
        </div>
    );
}