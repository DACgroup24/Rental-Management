// =====================================================================
// Central API client - built on the native Fetch API.
//
// Every request goes through the API Gateway (port 8080), never a
// microservice port directly - the gateway is the only place CORS is
// configured for http://localhost:5173, and it's the only address
// that's stable regardless of which physical port a microservice
// happens to be load-balanced to behind Eureka.
//
// Gateway routing table (from Eureka / MyRouteLocator):
//
//   Method  URL                                       Goes to
//   ------  ----------------------------------------  -------
//   POST    http://localhost:8080/auth/login           8081
//   POST    http://localhost:8080/api/register          8081
//   GET     http://localhost:8080/admin/landlords/pending 8081
//   GET     http://localhost:8080/api/properties         8082
//   GET     http://localhost:8080/api/cities             8082
//   GET     http://localhost:8080/api/property-types     8082
//   POST    http://localhost:8080/visit/request          8083
//
// (Plus the ones implied by the same controllers but not in that
// table: GET /api/properties/:id, /api/properties/search,
// /api/properties/landlord/:id, POST/PUT/DELETE /api/properties/:id,
// PUT /admin/approve/:uid, DELETE /admin/reject/:uid, and the rest of
// the /visit/** endpoints on Microservice 3.)
// =====================================================================

export const GATEWAY_URL = "http://localhost:8080";

// Exact endpoint constants, matching the routing table above 1:1.
export const ENDPOINTS = {
  LOGIN: `${GATEWAY_URL}/auth/login`,
  REGISTER: `${GATEWAY_URL}/api/register`,
  PENDING_LANDLORDS: `${GATEWAY_URL}/admin/landlords/pending`,
  PROPERTIES: `${GATEWAY_URL}/api/properties`,
  CITIES: `${GATEWAY_URL}/api/cities`,
  PROPERTY_TYPES: `${GATEWAY_URL}/api/property-types`,
  VISIT_REQUEST: `${GATEWAY_URL}/visit/request`,
};

function getToken() {
  return localStorage.getItem("token");
}

function buildHeaders(withAuth) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (withAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// Normalizes a fetch Response into `{ data, status }` (matching the
// shape the rest of the app already expects), and throws an Error
// carrying `.response.status` / `.response.data` on failure so
// existing `catch (err) { err.response?.data }` code across the app
// keeps working unchanged.
async function parseResponse(res) {
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (!window.location.pathname.includes("/login")) {
      window.location.href = "/login";
    }
  }

  const contentType = res.headers.get("content-type") || "";
  let body = null;
  if (contentType.includes("application/json")) {
    body = await res.json().catch(() => null);
  } else {
    body = await res.text().catch(() => null);
  }

  if (!res.ok) {
    const err = new Error(`Request failed with status code ${res.status}`);
    err.response = { status: res.status, data: body };
    throw err;
  }

  return { data: body, status: res.status };
}

function buildQueryString(params) {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  if (entries.length === 0) return "";
  return `?${new URLSearchParams(entries).toString()}`;
}

// Small axios-like wrapper (get/post/put/delete, all backed by
// `fetch`) so the rest of the app can keep calling
// `someApi.get('/path')` / `someApi.post('/path', body)` while every
// actual network call underneath is a native `fetch()`.
function createApiClient(baseURL, { withAuth = false } = {}) {
  async function request(method, path, body, { params } = {}) {
    const url = `${baseURL}${path}${buildQueryString(params)}`;
    const res = await fetch(url, {
      method,
      headers: buildHeaders(withAuth),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return parseResponse(res);
  }

  return {
    get: (path, config) => request("GET", path, undefined, config),
    post: (path, body, config) => request("POST", path, body, config),
    put: (path, body, config) => request("PUT", path, body, config),
    delete: (path, config) => request("DELETE", path, undefined, config),
  };
}

// Auth (Login/Register) - Gateway routes /auth/** and /api/register -> Microservice 1 (8081)
export const authApi = createApiClient(GATEWAY_URL, { withAuth: false });

// Properties/Cities/Property-Types - Gateway routes /api/** -> Microservice 2 (8082)
export const propertyApi = createApiClient(`${GATEWAY_URL}/api`, {
  withAuth: false,
});

// Visit Booking - Gateway routes /visit/** -> Microservice 3 (8083)
export const bookingApi = createApiClient(GATEWAY_URL, { withAuth: true });

// Admin (landlord approvals) - Gateway routes /admin/** -> Microservice 1 (8081)
export const adminApi = createApiClient(GATEWAY_URL, { withAuth: true });
