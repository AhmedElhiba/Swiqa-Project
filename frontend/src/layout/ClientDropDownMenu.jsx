import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUserContext } from "../context/ClientContext.jsx";
import ClientApi from "../services/api/Client/ClientApi.js";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../router";
import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";

export default function ClientDropDownMenu({ children }) {

    const navigate = useNavigate();
    const { logout: contextlogout } = useUserContext();

    const [user, setUser] = useState({});
     console.log(user)

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
    // console.log("User:", user.name);


    return <>
        {/* <DropdownMenu>
            <DropdownMenuTrigger asChild > <Button> <User className="mr-2 h-4 w-4" />{user.name}</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu> */}

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button> <svg xmlns="http://www.w3.org/2000/svg" className="text-[#f8ffa8] h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>{user.name}</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </>
}