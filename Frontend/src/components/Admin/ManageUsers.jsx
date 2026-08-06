import { useEffect, useState } from "react";
import { adminApi } from "../../services/api";

// NOTE: There is currently no GET /admin/users endpoint on
// Microservice 1's AdminController (only /admin/landlords/pending,
// /admin/approve/{uid} and /admin/reject/{uid} exist). This screen
// will show a clear message instead of silently failing until that
// endpoint is added on the backend, e.g.:
//
//   @GetMapping("/users")
//   public List<User> getAllUsers() { return userRepo.findAll(); }
//
export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notImplemented, setNotImplemented] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await adminApi.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setNotImplemented(true);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h3>Manage Users</h3>

      {loading ? (
        <p className="status-msg">Loading...</p>
      ) : notImplemented ? (
        <p className="status-msg error">
          The backend doesn't have a <code>GET /admin/users</code> endpoint
          yet. Add one to <code>AdminController</code> on Microservice 1 to
          enable this page (see comment at the top of this file).
        </p>
      ) : (
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
            {users.map((user) => (
              <tr key={user.uid}>
                <td>{user.uid}</td>
                <td>{user.uname}</td>
                <td>{user.email}</td>
                <td>{user.role?.rname}</td>
                <td>{user.status ? "Approved" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
