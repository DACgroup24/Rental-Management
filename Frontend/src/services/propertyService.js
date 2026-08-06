import { propertyApi } from "./api";

// Matches com.rental.property.controllers.PropertyController exactly.
// The backend now returns an enriched DTO (PropertyResponseDTO) with
// cityName / propertyTypeName / landlordName already resolved, so the
// UI never has to hardcode city or property-type lists.

const propertyService = {
  // GET /api/properties -> all properties
  async getAllProperties() {
    const res = await propertyApi.get("/properties");
    return res.data;
  },

  // GET /api/properties/search?city=&type=  (both optional)
  async searchProperties({ type, city }) {
    const params = {};
    if (type) params.type = type;
    if (city) params.city = city;
    const res = await propertyApi.get("/properties/search", { params });
    return res.data;
  },

  // GET /api/properties/{id}
  async getPropertyById(id) {
    const res = await propertyApi.get(`/properties/${id}`);
    return res.data;
  },

  // GET /api/properties/landlord/{landlordId} -> "My Properties"
  async getPropertiesByLandlord(landlordId) {
    const res = await propertyApi.get(`/properties/landlord/${landlordId}`);
    return res.data;
  },

  // GET /api/cities -> [{ cid, cname }, ...]
  async getCities() {
    const res = await propertyApi.get("/cities");
    return res.data;
  },

  // GET /api/property-types -> [{ ptid, typename }, ...]
  async getPropertyTypes() {
    const res = await propertyApi.get("/property-types");
    return res.data;
  },

  // POST /api/properties  (landlord only)
  // property: { landlordId, address, cid, rent, ptid, status, description, deposit, images }
  async addProperty(property) {
    const res = await propertyApi.post("/properties", property);
    return res.data;
  },

  // PUT /api/properties/{id}  (landlord only, full replace)
  async updateProperty(id, property) {
    const res = await propertyApi.put(`/properties/${id}`, property);
    return res.data;
  },

  // DELETE /api/properties/{id}  (landlord only)
  async deleteProperty(id) {
    const res = await propertyApi.delete(`/properties/${id}`);
    return res.data;
  },
};

export default propertyService;
