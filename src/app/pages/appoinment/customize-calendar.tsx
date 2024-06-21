import { Info, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';

export const CustomTimeGutterHeader = () => (
    <div className="custom-rbc-time-header-gutter flex flex-col items-center justify-center gap-2 p-1">
        <Info className="h-[18px] w-[18px] text-neutral-600" />
        <Settings className="h-[18px] w-[18px] text-neutral-600" />
    </div>
);

interface CustomResourceProps {
    name: string;
    photo: string;
}

export const CustomResource: React.FC<CustomResourceProps> = ({ name, photo }) => {
    return (
        <div className="flex h-[100%] flex-1 items-center !justify-start gap-4 !bg-white pl-3">
            <div className="resource-photo">
                <Avatar className="h-10 w-10 rounded-full bg-slate-100">
                    <AvatarImage src={photo} alt="Avatar" />
                    <AvatarFallback className="bg-transparent text-neutral-600">JD</AvatarFallback>
                </Avatar>
            </div>
            <div className="resource-name text-lg text-neutral-600">{name}</div>
        </div>
    );
};
