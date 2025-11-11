import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";

function Home() {
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const userString = localStorage.getItem("user");
        
        if (!userString) {
            navigate("/");
            return;
        }

        try {
            const user = JSON.parse(userString);
            setUsername(user.username);
        } catch (error) {
            console.error("Failed to parse user data:", error);
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <Card className="w-200"  style={{backgroundColor: '#842A3B', color: 'white'}}>
                <CardContent>
                    Hello, {username}!
                </CardContent>
            </Card>
        </div>
    );
}

export default Home