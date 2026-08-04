package com.example.demo.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MyRouteLocator {
	
	@Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
      return builder.routes()
           .route("auth",
                   r -> r.path("/auth/**","/api/**","/admin/**")
                           .uri("lb://RENTAL-MANAGEMENT"))
           /*.route("product",
                   r -> r.path("/product/**")
                           .uri("lb://SERVICE1RESOURCE"))
           .route("admin",
                   r -> r.path("/admin/**")
                           .uri("lb://SERVICE2"))*/
           .build();
     }


}
