import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSideBar } from "../app-sidebar";

function MainLayout() {
    return (
        <SidebarProvider>
            <AppSideBar/>
                <SidebarTrigger />
            <main className="w-full">
                <div className="flex flex-col items-center justify-center p-5">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}

export default MainLayout