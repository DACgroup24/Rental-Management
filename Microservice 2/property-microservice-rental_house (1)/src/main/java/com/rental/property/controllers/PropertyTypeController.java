package com.rental.property.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.property.entities.PropertyType;
import com.rental.property.repositories.PropertyTypeRepository;

// Exposes the real list of property types stored in the DB (e.g. "1 BHK
// Apartment", "Independent Villa"...) so the React dropdown always
// matches what search/type actually finds, instead of a hardcoded list.
@RestController
@RequestMapping("/api/property-types")
@CrossOrigin(origins = "*")
public class PropertyTypeController {

	@Autowired
	PropertyTypeRepository propertyTypeRepository;

	@GetMapping
	public List<PropertyType> getAll() {
		return propertyTypeRepository.findAll();
	}
}
