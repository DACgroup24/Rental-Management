import { useState, useEffect } from 'react';

export default function MyProperties({ landlordId }) {
    const [myProperties, setMyProperties] = useState([]);

    const fetchMyProperties = async () => {
        if (!landlordId) return;
        try {
            const response = await fetch(`http://localhost:9000/api/properties/landlord/${landlordId}`);
            const data = await response.json();
            setMyProperties(data);
        } catch (err) {
            console.error("Error fetching properties:", err);
        }
    };

    useEffect(() => {
        fetchMyProperties();
    }, [landlordId]);

    const handleDelete = async (pid) => {
        if (!window.confirm('Are you sure you want to delete this listing?')) return;
        
        const response = await fetch(`http://localhost:5000/api/properties/${pid}`, { method: 'DELETE' });
        
        if (response.ok) {
            alert('Property deleted.');
            fetchMyProperties();
        }
    };

    return (
        <div>
            <h3>Manage My Properties</h3>
            
            {myProperties.length === 0 ? (
                <p>You haven't posted any properties yet.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                    {myProperties.map(prop => (
                        <div key={prop.pid} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#fff' }}>
                            <h4>{prop.address}</h4>
                            <p><strong>Rent:</strong> ₹{prop.rent}/month</p>
                            <p><strong>Deposit:</strong> ₹{prop.deposit}</p>
                            <p><strong>Status:</strong> <span style={{ color: prop.status === 'Available' ? 'green' : 'red' }}>{prop.status}</span></p>
                            <p><strong>Description:</strong> {prop.description}</p>
                            {prop.images && <p><small><strong>Images:</strong> {prop.images}</small></p>}
                            <button 
                                onClick={() => handleDelete(prop.pid)} 
                                style={{ background: 'dc3545', color: 'white', padding: '6px 12px', cursor: 'pointer', border: 'none', borderRadius: '4px', marginTop: '8px' }}
                            >
                                Delete Listing
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}