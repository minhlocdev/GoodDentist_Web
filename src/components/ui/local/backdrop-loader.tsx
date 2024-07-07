import { LoaderCircle } from 'lucide-react';

const BackdropLoader = () => {
    return (
        <div className='flex items-center justify-center first-letter:w-sceen h-screen bg-white z-40'>
            <LoaderCircle className="h-5 w-5 animate-spin text-neutral-500" />
        </div>
    );
};

export default BackdropLoader;
