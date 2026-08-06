# PropertyHub — React Frontend

A React (Vite) frontend that consumes your Spring Boot Property Management REST API,
with two roles: **USER** (search only) and **LANDLORD** (add/update/delete their own properties).

## 1. Project structure

```
src/
├── components/
│   ├── common/     Navbar, Footer, Hero, SearchBar, ProtectedRoute
│   ├── property/   PropertyCard, PropertyGrid
│   ├── landlord/   AddProperty, EditProperty, MyProperties
│   └── auth/       LoginForm, RegisterForm
├── context/        AuthContext.jsx (stores logged-in user + role)
├── pages/          Home, Login, Register, UserDashboard, LandlordDashboard, PropertyDetails
├── services/       api.js (axios instance), authService.js, propertyService.js
├── App.jsx         Routing
└── main.jsx        Entry point
```

## 2. Setup

```bash
cd property-app
npm install
cp .env.example .env    # adjust VITE_API_BASE_URL if needed
npm run dev
```

App runs at `http://localhost:5173`.

## 3. Enable CORS on your Spring Boot backend

Add this to your controller (or a global `WebMvcConfigurer`):

```java
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/properties")
public class PropertyController { ... }
```

Or globally:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

## 4. Backend endpoints this frontend expects

Adjust `src/services/authService.js` and `src/services/propertyService.js`
to match your actual controller paths/field names — these are the assumed contract:

| Purpose                  | Method | Path                              | Auth       |
|---------------------------|--------|------------------------------------|------------|
| Login                     | POST   | `/api/auth/login`                 | -          |
| Register                  | POST   | `/api/auth/register`              | -          |
| Get all properties        | GET    | `/api/properties`                 | -          |
| Search by type/city       | GET    | `/api/properties/search?type=&city=` | -       |
| Get one property          | GET    | `/api/properties/{id}`            | -          |
| Get landlord's properties | GET    | `/api/properties/landlord/{id}`   | Landlord   |
| Add property              | POST   | `/api/properties`                 | Landlord   |
| Update property            | PUT    | `/api/properties/{id}`            | Landlord   |
| Delete property            | DELETE | `/api/properties/{id}`            | Landlord   |

Login is expected to return `{ token, id, name, email, role }`. The JWT `token` is
stored in `localStorage` and automatically attached as `Authorization: Bearer <token>`
to every request via the axios interceptor in `src/services/api.js`.

If your field names differ (e.g. backend returns `name` instead of `propertyName`,
or `location` instead of `city`), `PropertyCard.jsx` and `PropertyDetails.jsx`
already fall back between common variants — but double check against your actual
entity/DTO and adjust as needed.

## 5. Role-based routing

- `/dashboard` — only visible to logged-in **USER**s. Search bar + property grid.
- `/landlord/dashboard` — only visible to logged-in **LANDLORD**s. Add/edit/delete their properties.
- `ProtectedRoute.jsx` redirects unauthenticated users to `/login`, and redirects
  users with the wrong role to `/`.

## 6. Testing the full flow

1. Start Spring Boot (`http://localhost:8080`).
2. Start React (`npm run dev`, `http://localhost:5173`).
3. Register as a **LANDLORD**, log in, add a couple of properties.
4. Register as a **USER** (or open an incognito window), log in, search by city/type
   and confirm the landlord's listings appear.

## 7. Next steps / things you may want to add

- Pagination on the property grid for large datasets.
- Image upload (multipart) instead of an image URL field, if your backend supports it.
- Toast notifications instead of `alert()`/inline error text.
- Refresh-token handling if your backend issues short-lived JWTs.
