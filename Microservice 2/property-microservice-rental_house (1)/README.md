# Property Handling REST Microservice (Java Spring Boot)

This is a clean Spring Boot REST API microservice for handling rental house properties, mapped to MySQL database `rental_house`.

## MySQL Database Configuration
- Database Name: `rental_house`
- Main Table: `property`
- Supporting Tables: `city`, `property-type`, `user`, `role`, `accept request`, `contract`, `payment`, `request-visit`

## Key Microservice Endpoints
### Tenant Operations:
1. All Properties: `GET /api/properties`
2. Search by House Name / Address: `GET /api/properties/search/name?name={name}`
3. Search by Location / City: `GET /api/properties/search/location?location={location}`

### Owner Operations:
4. Add Property: `POST /api/properties`
5. Modify Property: `PUT /api/properties/{pid}`
6. Delete Property: `DELETE /api/properties/{pid}`

## How to Run
1. Start MySQL Server and run `src/main/resources/rental_house_dump.sql`
2. Configure credentials in `src/main/resources/application.properties`
3. Run command: `mvn clean spring-boot:run`
4. Access API at `http://localhost:8080/api/properties`
