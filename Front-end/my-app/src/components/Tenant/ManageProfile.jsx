import React, { useState } from "react";

const ManageProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
    console.log(profile);
  };

  return (
    <div>
      <h2>Manage Profile</h2>

      <form onSubmit={handleSubmit}>
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <tbody>
        
            <tr>
              <td>Full Name</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Phone Number</td>
              <td>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Address</td>
              <td>
                <textarea
                  name="address"
                  rows="3"
                  value={profile.address}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center">
                <button type="submit">Update Profile</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ManageProfile;