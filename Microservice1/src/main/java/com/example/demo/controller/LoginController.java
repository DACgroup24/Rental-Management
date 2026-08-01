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
@CrossOrigin(origins = "http://localhost:5173")
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
//package com.example.demo.controller;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.demo.dto.LoginDTO;
//import com.example.demo.dto.LoginResponseDTO;
//import com.example.demo.dto.RegisterDTO;
//import com.example.demo.entities.City;
//import com.example.demo.entities.Role;
//import com.example.demo.entities.User;
//import com.example.demo.repositories.CityRepository;
//import com.example.demo.repositories.RoleRepository;
//import com.example.demo.repositories.UserRepo;
//import com.example.demo.services.JwtService;
//import com.example.demo.services.LoginService;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//@RequestMapping("/auth")
//public class LoginController {
//	@Autowired
//	private UserRepo userRepo;
//	
//    @Autowired
//    private LoginService loginService;
//
//	@PostMapping("/login")
//	public ResponseEntity<?> login(@RequestBody LoginDTO req) {
//
//		Optional<User> optionalUser =
//				userRepo.findByUnameAndPassword(
//						req.getUname(),
//						req.getPassword());
//
//		if (optionalUser.isEmpty()) {
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//					.body("Invalid Username or Password");
//		}
//
//		 LoginResponseDTO response = loginService.login(req);
//		 
//		  if(response == null){
//
//	            return ResponseEntity
//	                    .status(HttpStatus.UNAUTHORIZED)
//	                    .body("Invalid Username or Password");
//	        }
//
////		  if(user.getRole().getRid() == 3 && !user.isStatus()) {
////			    return ResponseEntity
////			            .status(HttpStatus.FORBIDDEN)
////			            .body("ACCOUNT_PENDING");
////			}
//
//	        return ResponseEntity.ok(response);
//		 
//	//	User user = optionalUser.get();
//	
//		// Role-wise status update ?? shouldnt this be in register controller
////		if (user.getRole().getRid() == 2) {
////			user.setStatus(true);
////		} else if (user.getRole().getRid() == 3) {
////			user.setStatus(false);
////		}
////		else if (user.getRole().getRid() == 1) {
////			user.setStatus(true);
////		}
//		
////		If instead you meant only approved landlords (status = true) 
////		should be allowed to log in, then the login logic would be:
////		if (user.getRid() == 3 && !user.isStatus()) {
////		    return ResponseEntity.status(HttpStatus.FORBIDDEN)
////		            .body("Your account is not approved by Admin.");
////		}
//		//userRepo.save(user);
//
//		//return ResponseEntity.ok(new LoginResponseDTO(user, token));
//		//return ResponseEntity.ok(user);
//	}
//	
//	
//}
//
