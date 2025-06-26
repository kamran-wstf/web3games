const Loader = () => {
    return (
        <div className="fixed inset-0 bg-[#13111C] flex items-center justify-center z-50">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-4 border-t-purple-500 border-r-4 border-r-transparent animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-500 font-bold">
                    Loading...
                </div>
            </div>
        </div>
    );
};

export default Loader;