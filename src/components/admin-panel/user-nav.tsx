import { LayoutGrid, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export function UserNav() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={(user?.avatar as string) ?? ''}
                                        alt="Avatar"
                                    />
                                    <AvatarFallback className="bg-transparent">
                                        {user
                                            ? `${user?.name.charAt(0) + user?.name.charAt(1)}`
                                            : ''}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name ?? ''}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email ?? ''}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <a href="/" className="flex items-center">
                            <LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
                            Dashboard
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <a href="/account" className="flex items-center">
                            <User className="mr-3 h-4 w-4 text-muted-foreground" />
                            Account
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={() => navigate('/login', { replace: true })}
                >
                    <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
