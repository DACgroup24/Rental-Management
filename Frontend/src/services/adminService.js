import { adminApi } from "./api";

// Matches com.example.demo.controller.AdminController on
// Microservice 1 (Rental-management), reached through the gateway.

const adminService = {
  // GET /admin/landlords/pending
  async getPendingLandlords() {
    const res = await adminApi.get("/admin/landlords/pending");
    return res.data;
  },

  // PUT /admin/approve/{uid}
  async approveLandlord(uid) {
    const res = await adminApi.put(`/admin/approve/${uid}`);
    return res.data;
  },

  // DELETE /admin/reject/{uid}
  async rejectLandlord(uid) {
    const res = await adminApi.delete(`/admin/reject/${uid}`);
    return res.data;
  },
};

export default adminService;
