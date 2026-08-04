package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.services.LoginService;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {

        try {

            LoginResponseDTO response = loginService.login(dto);

            return ResponseEntity.ok(response);

        }

        catch (RuntimeException ex) {
        	  if(ex.getMessage().equals("INVALID_CREDENTIALS")){

                  return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                          .body("INVALID_CREDENTIALS");

              }

              if(ex.getMessage().equals("ACCOUNT_PENDING")){

                  return ResponseEntity.status(HttpStatus.FORBIDDEN)
                          .body("ACCOUNT_PENDING");

              }

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ex.getMessage());
        }

    }

}

