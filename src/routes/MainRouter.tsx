import MainLayout from "@/components/layouts/MainLayout";
import Home from "@/pages/Main/Home";
import Students from "@/pages/Main/Users/page";

const MainRouter = [
    {
        path: '/main',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'users',
                Component: Students,
            },
        ]
    }
]

export default MainRouter