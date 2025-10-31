export function VisualCardHome({ Icon, texto }) {
    return (
        <div className="space-y-4">
            <div className="flex space-x-2 items-center">
                <div className="border-2 border-orange-400 p-2 rounded-lg">
                    <Icon className="h-12 w-12 text-orange-400" />
                </div>
                <div className="space-y-1">
                    <h1 className="text-2xl">{texto}</h1>
                    <span className="flex w-4/5 h-1 rounded-full bg-orange-200"></span>
                    <span className="flex w-full h-2 rounded-full bg-orange-400"></span>
                </div>
            </div>
        </div>
    );
}