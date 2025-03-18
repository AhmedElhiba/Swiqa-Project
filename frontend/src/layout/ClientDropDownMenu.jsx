import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUserContext } from "@/context/ClientContext";
import ClientApi from "../services/api/Client/ClientApi";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../router";
import { useEffect, useState } from "react";

export default function ClientDropDownMenu() {
    const navigate = useNavigate();

    const { logout: contextlogout, } = useUserContext();
    const [user, setUser] = useState({});
    
    useEffect(() => {
        ClientApi.getUser().then(({ data }) => {
            setUser(data)
        })
    }, []);
    
    const logout = async () => {
        ClientApi.logout().then(() => {
            contextlogout()
            navigate(HOME_ROUTE)
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center px-4 py-2 rounded-lg bg-[#f8ffa8] hover:bg-yellow-400 transition-colors duration-200 shadow-md hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-themgreen" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-themgreen uppercase font-medium">{user.name || "User"}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 border border-gray-200 bg-white rounded-md shadow-lg">
                <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer hover:bg-gray-100">Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}