import { useState } from 'react';
import AddProperty from './AddProperty';
import MyProperties from './MyProperties';
import TenantApplications from './TenantApplications';
import { useSelector } from 'react-redux';

export default function LandlordDashboard() {
    const loginstate = useSelector(state => state.auth);
    const landlordId = loginstate.userid || loginstate.uid || 1;
    const [tab, setTab] = useState('my-properties');

    return (
        <div style={{ padding: '20px' }}>
            <h2>Welcome Landlord, {loginstate.username || 'User'}!</h2>
            
            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                <button 
                    onClick={() => setTab('my-properties')}
                    style={{ padding: '8px 16px', backgroundColor: tab === 'my-properties' ? '#007bff' : '#f8f9fa', color: tab === 'my-properties' ? '#fff' : '#000', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                    My Properties
                </button>
                <button 
                    onClick={() => setTab('add')}
                    style={{ padding: '8px 16px', backgroundColor: tab === 'add' ? '#007bff' : '#f8f9fa', color: tab === 'add' ? '#fff' : '#000', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                    Add Property
                </button>
                <button 
                    onClick={() => setTab('applications')}
                    style={{ padding: '8px 16px', backgroundColor: tab === 'applications' ? '#007bff' : '#f8f9fa', color: tab === 'applications' ? '#fff' : '#000', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                    Tenant Applications
                </button>
            </div>

            {/* Tab Content Display */}
            <div style={{ marginTop: '15px' }}>
                {tab === 'my-properties' && <MyProperties landlordId={landlordId} />}
                {tab === 'add' && <AddProperty landlordId={landlordId} setTab={setTab} />}
                {tab === 'applications' && <TenantApplications currentUser={{ id: landlordId }} />}
            </div>
        </div>
    );
}