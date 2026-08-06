import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

export default function LandlordRequests() {
  const [landlords, setLandlords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLandlords = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminService.getPendingLandlords();
      setLandlords(data);
    } catch (err) {
      setError("Could not load pending landlord requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLandlords();
  }, []);

  const approve = async (uid) => {
    try {
      await adminService.approveLandlord(uid);
      await loadLandlords();
    } catch (err) {
      setError("Could not approve this landlord. Please try again.");
    }
  };

  const reject = async (uid) => {
    try {
      await adminService.rejectLandlord(uid);
      await loadLandlords();
    } catch (err) {
      setError("Could not reject this landlord. Please try again.");
    }
  };

  return (
    <>
      <h3 className="mb-4">Pending Landlord Requests</h3>

      {error && <p className="status-msg error">{error}</p>}

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
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>
          ) : landlords.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Pending Requests
              </td>
            </tr>
          ) : (
            landlords.map((l) => (
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
          )}
        </tbody>
      </table>
    </>
  );
}
