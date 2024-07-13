import { LoaderCircle } from 'lucide-react';

const BackdropLoader = () => {
    return (
        <div className='flex items-center justify-center w-screen h-screen bg-white -z-0'>
            <LoaderCircle className="h-5 w-5 animate-spin text-neutral-500" />
        </div>
    );  
};

export default BackdropLoader;
