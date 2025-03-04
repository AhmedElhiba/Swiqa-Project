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

export default function ClientDropDownMenu() {
    const navigate = useNavigate();
        const { logout : contextlogout } = useUserContext()
    

    const logout = async () => {
        ClientApi.logout().then(() => {
            contextlogout()
            navigate(HOME_ROUTE)
        })
    }
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </>
}