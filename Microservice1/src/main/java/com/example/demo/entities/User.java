package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (name="user")
@Getter
@Setter
public class User {

	@Id
	@Column(name="uid") //auto increment
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;

	//handling foreign key 
	@ManyToOne
	@JoinColumn(name = "rid")
	private Role role;

	@Column(name="uname")
	String uname;

	@Column(name="password")
	String password;

	@Column(name="email")
	String email;

	@Column (name="phone")
	String phone;

	@Column (name="address")
	String address;

	@ManyToOne
	@JoinColumn(name="cid")
	City cid;

	@Column(name="adharno")
	String adharno;

	@Column (name="status")
	boolean status;
	
}
