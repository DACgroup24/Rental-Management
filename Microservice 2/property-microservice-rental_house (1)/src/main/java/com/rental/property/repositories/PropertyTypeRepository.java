package com.rental.property.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rental.property.entities.PropertyType;

@Repository
public interface PropertyTypeRepository extends JpaRepository<PropertyType, Integer> {
}
