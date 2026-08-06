package com.example.demo.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyRouteLocator {

	// Eureka service ids (upper-cased spring.application.name of each microservice):
	// Microservice 1 -> Rental-management              -> RENTAL-MANAGEMENT              (port 8081)
	// Microservice 2 -> rental-house-microservice       -> RENTAL-HOUSE-MICROSERVICE      (port 8082)
	// Microservice 3 -> Booking-microservice-rental-house -> BOOKING-MICROSERVICE-RENTAL-HOUSE (port 8083)

	@Bean
	public RouteLocator routeLocator(RouteLocatorBuilder builder) {
		return builder.routes()

				// ---- Microservice 1: auth / admin / register ----
				.route("auth-service", r -> r.path("/auth/**")
						.uri("lb://Rental-management"))
				.route("admin-service", r -> r.path("/admin/**")
						.uri("lb://Rental-management"))
				//.route("register-service", r -> r.path("/api/**")
						//.uri("lb://Rental-management"))

				// ---- Microservice 2: properties / cities / property-types ----
				.route("property-service", r -> r.path("/api/properties/**")
						.uri("lb://RENTAL-HOUSE-MICROSERVICE"))
				.route("city-service", r -> r.path("/api/cities/**")
						.uri("lb://rental-house-microservice"))
				.route("property-type-service", r -> r.path("/api/property-types/**")
						.uri("lb://rental-house-microservice"))

				// ---- Microservice 3: visit / booking requests ----
				.route("visit-service", r -> r.path("/visit/**")
						.uri("lb://Booking-microservice-rental-house"))

				.build();
	}

}
