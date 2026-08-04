package com.rental.property.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.rental.property.dto.PropertyResponseDTO;
import com.rental.property.entities.Property;
import com.rental.property.services.PropertyService;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

	@Autowired
	PropertyService propertyService;

	// 1. Tenant: Fetch All Properties
	@GetMapping
	public List<PropertyResponseDTO> getAll() {
		return propertyService.getAll();
	}

	// Fetch Single Property by ID
	@GetMapping("/{id}")
	public PropertyResponseDTO getById(@PathVariable("id") int pid) {
		return propertyService.getById(pid);
	}

	// 2. Combined search used by the "Available Properties" page.
	// Both params are optional, either or both may be supplied.
	// http://localhost:8080/api/properties/search?city=Mumbai&type=Apartment
	@GetMapping("/search")
	public List<PropertyResponseDTO> search(@RequestParam(value = "city", required = false) String city,
			@RequestParam(value = "type", required = false) String type) {
		return propertyService.search(city, type);
	}

	// 3. Search House by Name / Address
	// http://localhost:8080/api/properties/search/name/Andheri
	@GetMapping("/search/name/{name}")
	public List<PropertyResponseDTO> getByName(@PathVariable("name") String name) {
		return propertyService.getPropertiesByName(name);
	}

	// 4. Search House by City Name (cname from city table)
	// http://localhost:8080/api/properties/search/city/Mumbai
	@GetMapping("/search/city/{cname}")
	public List<PropertyResponseDTO> getByCity(@PathVariable("cname") String cname) {
		return propertyService.getPropertiesByCity(cname);
	}

	// 5. Search House by Property Type Name (typename from property-type table)
	// http://localhost:8080/api/properties/search/type/2%20BHK%20Apartment
	@GetMapping("/search/type/{type}")
	public List<PropertyResponseDTO> getByType(@PathVariable("type") String type) {
		return propertyService.getPropertiesByType(type);
	}

	// 6. Landlord: fetch only the properties owned by this landlord
	// http://localhost:8080/api/properties/landlord/1
	@GetMapping("/landlord/{landlordId}")
	public List<PropertyResponseDTO> getByLandlord(@PathVariable("landlordId") Integer landlordId) {
		return propertyService.getPropertiesByLandlord(landlordId);
	}

	// 7. Owner: Add Property
	@PostMapping
	public PropertyResponseDTO save(@RequestBody Property property) {
		return propertyService.save(property);
	}

	// 8. Owner: Full Update Property (PUT)
	/*
	 * curl -X PUT http://localhost:8080/api/properties/1 \ -H
	 * "Content-Type: application/json" \ -d
	 * '{"landlordId":1,"address":"Flat 401, Sapphire Heights, Andheri West","cid":1
	 * ,"rent":48000,"ptid":2,"status":"Rented",
	 * "description":"Spacious 2 BHK with sea view - Fully updated.","deposit":
	 * 150000,"images":"img_url_1.jpg"}'
	 */
	@PutMapping("/{id}")
	public PropertyResponseDTO updateProperty(@PathVariable("id") int pid, @RequestBody Property property) {
		return propertyService.updateProperty(pid, property);
	}

	// 8b. Owner: Partial Update Property (PATCH)
	/*
	 * curl -X PATCH http://localhost:8080/api/properties/1 \ -H
	 * "Content-Type: application/json" \ -d '{"rent":50000,"status":"Rented"}'
	 */
	@PatchMapping("/{id}")
	public PropertyResponseDTO updPropertyPatch(@PathVariable("id") int pid, @RequestBody Property property) {
		return propertyService.updPropertyPatch(pid, property);
	}

	// 9. Owner: Delete Property
	// DELETE - http://localhost:8080/api/properties/1
	@DeleteMapping("/{id}")
	public boolean delete(@PathVariable("id") int pid) {
		return propertyService.delete(pid);
	}
}
