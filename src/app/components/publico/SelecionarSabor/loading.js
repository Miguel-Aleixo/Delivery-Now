export function Loading() {
    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-yellow-400 mb-2" />
            </div>
        </div>
    );
}
