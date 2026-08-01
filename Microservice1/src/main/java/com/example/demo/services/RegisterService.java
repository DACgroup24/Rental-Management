package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dto.RegisterDTO;
import com.example.demo.entities.City;
import com.example.demo.entities.Role;

import com.example.demo.entities.User;
import com.example.demo.repositories.CityRepository;
import com.example.demo.repositories.RoleRepository;

import com.example.demo.repositories.UserRepo;

@Service
public class RegisterService {
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private CityRepository cityRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	
	//register is a method that returns a User obj
	public User register(RegisterDTO rdto) {
		City city = cityRepo.findById(rdto.getCid())
		        .orElseThrow(() -> new RuntimeException("City not found. ID = " + rdto.getCid()));

		Role role = roleRepo.findById(rdto.getRid())
		        .orElseThrow(() -> new RuntimeException("Role not found. ID = " + rdto.getRid()));
		User user = new User();
		user.setRole(role);
		user.setUname(rdto.getUname());
		//user.setPassword(rdto.getPassword());
		  user.setPassword(passwordEncoder.encode(rdto.getPassword()));
		user.setEmail(rdto.getEmail());
		user.setPhone(rdto.getPhone());
		user.setAddress(rdto.getAddress());
		user.setCid(city);
		user.setAdharno(rdto.getAdharno());
	
		if(rdto.getRid() == 2)
			user.setStatus(true);
		else if(rdto.getRid() == 3)
			user.setStatus(false);
		else if(rdto.getRid() == 1)
			user.setStatus(true);
		

		return userRepo.save(user);
		
		
		
	}
	
}
