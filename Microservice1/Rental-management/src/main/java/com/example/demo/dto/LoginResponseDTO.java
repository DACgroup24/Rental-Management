package com.example.demo.dto;

import com.example.demo.entities.User;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class LoginResponseDTO {
	
	   private User user;
	    private String token;

	    public LoginResponseDTO(User user, String token) {
	        this.user = user;
	        this.token = token;
	    }

//	    public User getUser() {
//	        return user;
//	    }
//
//	    public String getToken() {
//	        return token;
//	    }

}
