package com.example.demo.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table (name="role")
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="rid")
	int rid;

	@Column(name="rname")
	String rname;

	//handling foreign key
	//	  @OneToMany(mappedBy = "role")
	//	    private List<User> user;

//	public int getRid() {
//		return rid;
//	}
//
//	public void setRid(int rid) {
//		this.rid = rid;
//	}
//
//	public String getRname() {
//		return rname;
//	}
//
//	public void setRname(String rname) {
//		this.rname = rname;
//	}
//
//	public List<User> getUser() {
//		return user;
//	}
//
//	public void setUser(List<User> user) {
//		this.user = user;
//	}



}

