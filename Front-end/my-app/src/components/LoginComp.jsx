import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from '../redux/authSlice'
import { useNavigate } from "react-router-dom"

export default function LoginComp() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMessage] = useState("")
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const reqoptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };

        try {
            const resp = await fetch("http://localhost:9000/login", reqoptions);
            
            // Safely parse JSON or Text
            const textResponse = await resp.text();
            let data = {};
            try {
                data = JSON.parse(textResponse);
            } catch {
                data = { error: textResponse };
            }

            if (resp.ok && data.user) {
                console.log("Login Success:", data);

                dispatch(login({
                    user: data.user,
                    token: data.token
                }));

                if (data.user.role === 1) {
                    navigate("/admin");
                } else if (data.user.role === 2) {
                    navigate("/user");
                } else if (data.user.role === 3) {
                    navigate("/landlord", { state: { currentUser: data.user } });
                }
            } else {
                setMessage(data.error || "Login failed: Invalid credentials");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setMessage("Server connection failed. Please try again later.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                Enter username:
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={(e) => setUserName(e.target.value)} 
                />
                <br /><br />
                Enter Password:
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <br /><br />
                <input type="submit" value="Login" />
            </form>

            {msg && <p style={{ color: "red", fontWeight: "bold" }}>{msg}</p>}
        </div>
    );
}