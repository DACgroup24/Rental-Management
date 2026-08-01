import { useEffect, useState } from "react";

export default function LandlordRequests() {

    const [landlords, setLandlords] = useState([]);

    const token = localStorage.getItem("token");

    const loadLandlords = () => {

        fetch("http://localhost:8081/admin/landlords/pending", {

            headers: {

                Authorization: `Bearer ${token}`

            }

        })
            .then(res => res.json())
            .then(data => setLandlords(data))
            .catch(err => console.log(err));

    };

    useEffect(() => {

        loadLandlords();

    }, []);

    const approve = (uid) => {

        fetch(`http://localhost:8081/admin/approve/${uid}`, {

            method: "PUT",

            headers: {

                Authorization: `Bearer ${token}`

            }

        })
            .then(() => loadLandlords());

    };

    const reject = (uid) => {

        fetch(`http://localhost:8081/admin/reject/${uid}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        })
            .then(() => loadLandlords());

    };

    return (

        <>

            <h3 className="mb-4">

                Pending Landlord Requests

            </h3>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Address</th>

                        <th>Aadhar</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        landlords.length === 0 ?

                            (

                                <tr>

                                    <td colSpan="7" className="text-center">

                                        No Pending Requests

                                    </td>

                                </tr>

                            )

                            :

                            landlords.map(l => (

                                <tr key={l.uid}>

                                    <td>{l.uid}</td>

                                    <td>{l.uname}</td>

                                    <td>{l.email}</td>

                                    <td>{l.phone}</td>

                                    <td>{l.address}</td>

                                    <td>{l.adharno}</td>

                                    <td>

                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => approve(l.uid)}
                                        >

                                            Approve

                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => reject(l.uid)}
                                        >

                                            Reject

                                        </button>

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </>

    );

}