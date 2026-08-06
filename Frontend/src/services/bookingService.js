import { bookingApi } from "./api";

// Matches com.example.demo.controller.VisitController exactly
// (Microservice 3 - Booking-microservice-rental-house, port 8083).
//
// Visit status codes returned by the backend (RequestVisit.status):
//   0 = pending, 1 = accepted, 2 = rejected
export const VISIT_STATUS = {
  0: "pending",
  1: "accepted",
  2: "declined",
};

const bookingService = {
  // POST /visit/request
  // payload: { pid, uid, visitDate: 'YYYY-MM-DD', visitTime: 'HH:mm:ss' }
  async requestVisit(payload) {
    const res = await bookingApi.post("/visit/request", payload);
    return res.data;
  },

  // GET /visit/landlord/{landlordId} -> visit requests across all of a landlord's properties
  async getLandlordRequests(landlordId) {
    const res = await bookingApi.get(`/visit/landlord/${landlordId}`);
    return res.data;
  },

  // GET /visit/user/{uid} -> visit requests made by a tenant
  async getUserRequests(uid) {
    const res = await bookingApi.get(`/visit/user/${uid}`);
    return res.data;
  },

  // PUT /visit/accept/{requestId}  (landlord only)
  async acceptRequest(requestId) {
    const res = await bookingApi.put(`/visit/accept/${requestId}`);
    return res.data;
  },

  // PUT /visit/reject/{requestId}  (landlord only)
  async rejectRequest(requestId) {
    const res = await bookingApi.put(`/visit/reject/${requestId}`);
    return res.data;
  },
};

export default bookingService;
