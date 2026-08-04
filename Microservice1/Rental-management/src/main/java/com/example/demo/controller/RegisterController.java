package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RegisterDTO;
import com.example.demo.entities.City;
import com.example.demo.entities.User;
import com.example.demo.repositories.CityRepository;
import com.example.demo.services.RegisterService;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:5173")

public class RegisterController {
	@Autowired
	private RegisterService registerService;
	
	@Autowired
	 private CityRepository cityRepo;

	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody RegisterDTO dto) {

		User user = registerService.register(dto);

		return ResponseEntity.ok(user);

	}
	  @GetMapping("/register")
	    public List<City> getAllCities() {

	        return cityRepo.findAll();

	    }
}
