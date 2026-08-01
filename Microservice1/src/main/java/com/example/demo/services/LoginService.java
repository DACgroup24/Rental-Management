package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepo;

@Service
public class LoginService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public LoginResponseDTO login(LoginDTO dto) {
    	//User user = userRepo.findByUname(dto.getUname());

    	User user = userRepo.findByUname(dto.getUname())
                .orElseThrow(() -> new RuntimeException("Invalid Credentials"));
    	
        if (user == null) {
            throw new RuntimeException("INVALID_CREDENTIALS");
        }

        // Check password
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("INVALID_CREDENTIALS");
        }

        // Only landlords require approval
        if (user.getRole().getRid() == 3 && !user.isStatus()) {
            throw new RuntimeException("ACCOUNT_PENDING");
        }

        // Generate JWT
        String token = jwtService.generateToken(user.getUname());

        // Return response
        return new LoginResponseDTO(user, token);


    }
}
