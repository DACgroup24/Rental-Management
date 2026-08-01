package com.rental.property.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.property.entities.City;
import com.rental.property.repositories.CityRepository;

// Exposes the list of cities so the React app can populate a city
// dropdown / autocomplete instead of hardcoding city names.
@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "*")
public class CityController {

	@Autowired
	CityRepository cityRepository;

	@GetMapping
	public List<City> getAll() {
		return cityRepository.findAll();
	}
}
