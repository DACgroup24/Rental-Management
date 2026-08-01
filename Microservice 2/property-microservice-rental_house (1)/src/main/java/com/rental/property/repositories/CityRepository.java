package com.rental.property.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rental.property.entities.City;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
}
