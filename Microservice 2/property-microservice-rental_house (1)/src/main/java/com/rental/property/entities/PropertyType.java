package com.rental.property.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "property-type")
public class PropertyType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer ptid;

	String typename;

	public PropertyType() {
		super();
	}

	public PropertyType(String typename) {
		super();
		this.typename = typename;
	}

	public Integer getPtid() {
		return ptid;
	}

	public void setPtid(Integer ptid) {
		this.ptid = ptid;
	}

	public String getTypename() {
		return typename;
	}

	public void setTypename(String typename) {
		this.typename = typename;
	}
}
