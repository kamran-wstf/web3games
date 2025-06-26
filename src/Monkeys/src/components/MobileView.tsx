import { Laptop } from 'lucide-react';

const MobileWarning = () => {
    return (
        <div className="min-h-screen bg-[#13111C] text-white p-6 flex flex-col items-center justify-center text-center lg:hidden">
            <Laptop className="w-16 h-16 mb-6 text-purple-500" />
            <h1 className="text-3xl font-bold mb-4">Desktop Only Experience</h1>
            <p className="text-gray-400 max-w-md">
                Monad Keys is optimized for desktop use. Please switch to a laptop or desktop computer for the best typing experience.
            </p>
        </div>
    );
};

export default MobileWarning;