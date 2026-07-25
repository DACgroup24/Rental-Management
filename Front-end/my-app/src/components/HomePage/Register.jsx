export default function Register(){
return(
    <>
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid black' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="user">Tenant (User)</option>
                    <option value="landlord">Landlord</option>
                </select>
                <input type="text" placeholder="Name" required onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={() => setAuthView('login')} style={{ marginTop: '10px' }}>Switch to Login</button>
        </div>
        </>
)

}