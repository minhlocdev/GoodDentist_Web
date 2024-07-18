import { LoaderCircle } from 'lucide-react';

const BackdropLoader = () => {
    return (
        <div className="-z-0 flex h-screen w-screen items-center justify-center bg-white">
            <LoaderCircle className="h-5 w-5 animate-spin text-neutral-500" />
        </div>
    );
};

export default BackdropLoader;
