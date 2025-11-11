import Login from "@/pages/Guest/Login";
import GuestLayout from '@/components/layouts/GuestLayout'

const GuestRouter = [
    {
        path: '/',
        Component: GuestLayout,
        children: [
            {
                index: true,
                Component: Login
            }
        ]
    }
]

export default GuestRouter