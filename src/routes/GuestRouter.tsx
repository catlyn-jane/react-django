import Login from "@/pages/Guest/Login";
import GuestLayout from '@/components/layouts/GuestLayout'

const GuestRouter = [
    {
        path: '/',
        Component: GuestLayout,// layout for Guest
        children: [
            {
                index: true,
                Component: Login
            }
        ]
    }
]

export default GuestRouter