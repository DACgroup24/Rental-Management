import { useState } from 'react';

export default function AddProperty({ landlordId, setTab }) {
    const [form, setForm] = useState({
        address: '',
        rent: '',
        deposit: '',
        description: '',
        images: '',
        ptid: 1,
        cid: 1  
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:9000/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, landlord_id: landlordId }), 
        });
        
        if (response.ok) {
            alert('Property Posted Successfully!');
            if (setTab) setTab('my-properties');
        } else {
            alert('Error adding property');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
            <h3>Post a Property</h3>
            <input 
                type="text" 
                placeholder="Address (e.g. Flat 401, Sapphire Heights)" 
                required 
                value={form.address}
                onChange={e => setForm({...form, address: e.target.value})} 
            />
            <input 
                type="number" 
                placeholder="Monthly Rent (₹)" 
                required 
                value={form.rent}
                onChange={e => setForm({...form, rent: e.target.value})} 
            />
            <input 
                type="number" 
                placeholder="Deposit Amount (₹)" 
                required 
                value={form.deposit}
                onChange={e => setForm({...form, deposit: e.target.value})} 
            />
            <input 
                type="text" 
                placeholder="Image URLs / Names (comma separated)" 
                value={form.images}
                onChange={e => setForm({...form, images: e.target.value})} 
            />
            <textarea 
                placeholder="Property Description" 
                rows="3"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})} 
            />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
                Post Property
            </button>
        </form>
    );
}