package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.City;

public interface CityRepository extends JpaRepository<City, Integer> {
	List<City> findByCid(int cid);

}
