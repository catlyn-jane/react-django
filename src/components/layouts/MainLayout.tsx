import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSideBar } from "../app-sidebar";

function MainLayout() {
    return (
        <SidebarProvider>
            <AppSideBar/>
            <main className="w-full">
                <SidebarTrigger />
        
                <div className="flex flex-col items-center justify-center p-5">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}

export default MainLayout