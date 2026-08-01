import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginComp() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMessage] = useState("");
    const [pendingApproval, setPendingApproval] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear previous messages
        setMessage("");
        setPendingApproval(false);

        const reqoptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uname: username,
                password: password,
            }),
        };

        fetch("http://localhost:8081/auth/login", reqoptions)
            .then(async (resp) => {
                if (resp.ok) {
                    return resp.json();
                }

                if (resp.status === 401) {
                    throw new Error("Invalid username or password.");
                }

                const error = await resp.text();
                throw new Error(error || "Login failed.");
            })
            .then((data) => {
                // Check for unapproved landlord
                if (
                    data.user.role.rid === 3 &&
                    data.user.status === false
                ) {
                    setPendingApproval(true);
                    return;
                }

                // Store login details
                dispatch(
                    login({
                        user: data.user,
                        token: data.token,
                    })
                );

                // Navigate based on role
                if (data.user.role.rid === 1) {
                    navigate("/admin");
                } else if (data.user.role.rid === 2) {
                    navigate("/user");
                } else if (data.user.role.rid === 3) {
                    navigate("/landlord");
                }
            })
            .catch((err) => {
                setMessage(err.message);
            });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="text-center mb-4">Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) =>
                                    setUserName(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>
                    </form>

                    {/* Invalid login message */}
                    {msg && (
                        <div className="alert alert-danger mt-3">
                            {msg}
                        </div>
                    )}

                    {/* Pending approval message */}
                    {pendingApproval && (
                        <div className="alert alert-warning mt-3">
                            <strong>Account Pending Approval</strong>
                            <br />
                            Your registration request has been sent to the
                            Administrator.
                            <br />
                            You will be able to log in only after your account
                            has been been approved.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { login } from "../../redux/authSlice";
// // import { useNavigate } from "react-router-dom";

// // export default function LoginComp() {
// //     const [username, setUserName] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [msg, setMessage] = useState("");

// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         const reqoptions = {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({
// //                 uname: username,
// //                 password: password,
// //             }),
// //         };

// //         fetch("http://localhost:8081/auth/login", reqoptions)
// //             .then(async (resp) => {
// //                 if (resp.ok) {
// //                     return resp.json();
// //                 }

// //                 const message = await resp.text();
// //                 throw new Error(message || "Invalid username or password");
// //             })
// //             .then((data) => {
// //                 console.log(data);

// //                 dispatch(
// //                     login({
// //                         user: data.user,
// //                         token: data.token,
// //                     })
// //                 );

// //                 if (data.user.role.rid === 1) {
// //                     navigate("/admin");
// //                 } else if (data.user.role.rid === 2) {
// //                     navigate("/user");
// //                 } else if (data.user.role.rid === 3) {
// //                     if(data.user.status===1){
// //                     navigate("/landlord");
// //                     }
// //                     // else{
// //                     //     navigate("/unapproved")
// //                     // }
// //                 }
// //             })
// //             .catch((err) => {
// //                 // navigate("/unauthorized")
// //                 console.error(err);
// //                 setMessage("/unauthorized");
// //             });
// //     };

// //     return (
// //         <>
// //             <h1>Login Form</h1>

// //             <form onSubmit={handleSubmit}>
// //                 <div className="mb-3">
// //                     <label>Username</label>
// //                     <input
// //                         type="text"
// //                         className="form-control"
// //                         value={username}
// //                         onChange={(e) => setUserName(e.target.value)}
// //                     />
// //                 </div>

// //                 <div className="mb-3">
// //                     <label>Password</label>
// //                     <input
// //                         type="password"
// //                         className="form-control"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                     />
// //                 </div>

// //                 <button type="submit" className="btn btn-primary">
// //                     Login
// //                 </button>

// //                 {msg && (
// //                     <p className="text-danger mt-3">
// //                         {msg}
// //                     </p>
// //                 )}
// //             </form>
// //         </>
// //     );
// // }
// // import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { login } from '../../redux/authSlice'
// import { useNavigate } from "react-router-dom"
// export default function LoginComp() {
//     const [username, setUserName] = useState("")
//     const [password, setPassword] = useState("")
//     const [msg, setMessage] = useState("")
//     const dispatch = useDispatch(); //hoook function
//     const navigate = useNavigate();
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const reqoptions = {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify({
//                 //username:username,
//                 uname: username,
//                 password: password
//             })
//         }
//         //9000 :: express server , 8081 :: spring boot server
//         fetch("http://localhost:8081/auth/login", reqoptions)
//             .then(async (resp) => {
//                 if (resp.status === 200) {
//                     return resp.json();
//                 }
//                 const message = await resp.text();
//                 throw new Error(message); if (resp.status === 404) {
//                     setMessage("Wrong ID/Password")
//                     return {};
//                 }


//             })
//             .then(data => {
//                 console.log(JSON.stringify(data))
//                 dispatch(login({
//                     user: data.user,
//                     token: data.token
//                 }))
//                 if (data.user.role.rid === 1) { //navigate to admin dashboard
//                     navigate("/admin")
//                 }
//                 else if (data.user.role.rid === 2) {//navigate to user dashboard
//                     navigate("/user")
//                 }

//                 else if (data.user.role.rid === 3) {
//                     if (data.user.status === false) {
//                         navigate("/pending");
//                     } else {
//                         navigate("/landlord", { currentUser: data.user })
//                     }
//                 }

//             })
//             .catch(err => {
//                 setMessage(err.message);
//             });

//     });

// }
// return (
//     <>
//         <h1>Login Form</h1>
//         <form>
//             Enter username:
//             <input type="text" name="username" value={username} onChange={(e) => { setUserName(e.target.value) }} />
//             <br />
//             Enter Password:
//             <input type="text" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
//             <br />
//             <input type="submit" value="Login" onClick={handleSubmit} />
//         </form>

//     </>
// )

// }
 