import { useState, useEffect } from 'react';

export default function TenantApplications({ currentUser }) {
    const [applications, setApplications] = useState([]);

    // 1. Fetch bookings from the MySQL backend
    const fetchApplications = async () => {
        // Notice the URL is now /api/bookings/
        const response = await fetch(`http://localhost:5000/api/bookings/landlord/${currentUser.id}`);
        const data = await response.json();
        setApplications(data);
    };

    useEffect(() => {
        fetchApplications();
    }, [currentUser.id]);

    // 2. Handle approving or rejecting a booking
    const handleUpdateStatus = async (bookingId, newStatus) => {
        // Notice this also uses /api/bookings/
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }) 
        });

        if (response.ok) {
            alert(`Booking ${newStatus} successfully!`);
            fetchApplications(); // Refresh the list
        }
    };

    return (
        <div>
            <h3>Tenant Bookings</h3>
            
            {applications.length === 0 ? (
                <p>You have no bookings yet.</p>
            ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                    {applications.map(app => (
                        // We use 'bookingid' here because that is what your MySQL database returns
                        <div key={app.bookingid} style={{ border: '1px solid #ccc', padding: '15px' }}>
                            
                            {/* Matching the exact columns returned by your SQL JOIN */}
                            <h4>{app.type} at {app.address}</h4>
                            <p><strong>Applicant:</strong> {app.firstname} {app.lastname}</p>
                            <p><strong>Contact:</strong> {app.contactnumber}</p>
                            <p><strong>Status:</strong> {app.status}</p>
                            
                            {/* Only show Approve/Reject if it is Pending */}
                            {app.status === 'Pending' && (
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button 
                                        onClick={() => handleUpdateStatus(app.bookingid, 'Approved')}
                                        style={{ background: 'green', color: 'white', padding: '5px 10px', cursor: 'pointer', border: 'none' }}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => handleUpdateStatus(app.bookingid, 'Rejected')}
                                        style={{ background: 'red', color: 'white', padding: '5px 10px', cursor: 'pointer', border: 'none' }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}