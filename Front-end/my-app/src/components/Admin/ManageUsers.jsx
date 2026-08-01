import { useEffect, useState } from "react";

export default function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:8081/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err));

    }, []);

    return (

        <>
            <h3>Manage Users</h3>

            <table className="table table-striped">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        users.map(user => (

                            <tr key={user.uid}>

                                <td>{user.uid}</td>

                                <td>{user.uname}</td>

                                <td>{user.email}</td>

                                <td>{user.role.rname}</td>

                                <td>{user.status ? "Approved" : "Pending"}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </>

    );
}