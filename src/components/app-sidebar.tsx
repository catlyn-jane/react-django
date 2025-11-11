import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, UserCog } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router';
import { Button } from "./ui/button";


const main_items = [
    {
        title: "Home",
        url: "/main",
        icon: Home
    },
    {
        title: "Students",
        url: "/main/users",
        icon: UserCog
    },
]

export function AppSideBar() {
    const navigate = useNavigate()
    const currentPage = useLocation().pathname
    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <Sidebar>
            <SidebarHeader>
                <h1>Students Information Site</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                main_items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.url === currentPage}>

                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <div className="flex flex-col w-full">
                    <Button variant="destructive" onClick={logout}>
                        Logout
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}