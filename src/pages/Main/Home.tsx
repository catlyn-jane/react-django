import { useEffect } from "react";
import { useNavigate } from "react-router";

function Home() {
    
    const user = JSON.parse(localStorage.getItem("user")!!)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate("/")
        }
    },[])

    return (
        <>
            <h1>Home Page</h1>
        </>
    )
}

export default Home