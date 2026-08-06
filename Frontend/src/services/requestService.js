const STORAGE_KEY = "visitRequests";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/**
 * Save a new visit request.
 * data: { propertyId, propertyAddress, landlordUsername,
 *         renterName, renterPhone, renterEmail, date, time }
 */
function addRequest(data) {
  const list = readAll();
  const newRequest = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: "pending", // 'pending' | 'accepted' | 'declined'
    seen: true, // renter just created it themselves, nothing to notify yet
    createdAt: new Date().toISOString(),
  };
  list.push(newRequest);
  writeAll(list);
  return newRequest;
}

// Returns all requests, optionally filtered to one landlord's properties.
// If landlordUsername is omitted, returns every request (useful during setup/testing).
function getRequests(landlordUsername) {
  const list = readAll();
  if (!landlordUsername) return list;
  return list.filter((r) => r.landlordUsername === landlordUsername);
}

// Returns all requests made by a given renter, matched by username first
// (when the renter was logged in while booking) and falling back to email.
function getRequestsForRenter(identifier) {
  const list = readAll();
  if (!identifier) return [];
  return list.filter(
    (r) => r.renterUsername === identifier || r.renterEmail === identifier
  );
}

// Landlord accepts/declines a request. Flips `seen` to false so the
// renter gets a "new update" notification the next time they check.
function updateStatus(id, status) {
  const list = readAll();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], status, seen: false };
  writeAll(list);
  return list[idx];
}

// Renter has viewed the accepted/declined update — clear the "new" flag.
function markSeen(id) {
  const list = readAll();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], seen: true };
  writeAll(list);
  return list[idx];
}

export default {
  addRequest,
  getRequests,
  getRequestsForRenter,
  updateStatus,
  markSeen,
};
