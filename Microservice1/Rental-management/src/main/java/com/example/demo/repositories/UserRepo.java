
package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
	
	// Optional<User> findByUnameAndPassword(String uname, String password);
	 
	 List<User> findByRoleRidAndStatus(int rid, boolean status);

	// User findByUname(String uname);
	 
	 Optional<User> findByUname(String uname);

}

