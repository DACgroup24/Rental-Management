package com.rental.property.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Read-only mapping onto the existing `user` table so the property microservice
 * can resolve a landlord's display name without needing a separate call to a
 * user microservice. Only the columns we actually need are mapped.
 */
@Entity
@Table(name = "user")
public class User {

	@Id
	Integer uid;

	String uname;

	String fname;

	String lname;

	String email;

	String phone;

	public User() {
		super();
	}

	public Integer getUid() {
		return uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFullName() {
		String full = ((fname != null ? fname : "") + " " + (lname != null ? lname : "")).trim();
		return full.isEmpty() ? uname : full;
	}
}
