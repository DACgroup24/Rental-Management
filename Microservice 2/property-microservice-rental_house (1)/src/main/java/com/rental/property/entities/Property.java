package com.rental.property.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "property")
public class Property {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer pid;

	Integer landlordId;

	String address;

	Integer cid;

	Double rent;

	Integer ptid;

	String status;

	String description;

	Double deposit;

	String images;

	public Property() {
		super();
	}

	public Property(Integer landlordId, String address, Integer cid, Double rent, Integer ptid, String status,
			String description, Double deposit, String images) {
		super();
		this.landlordId = landlordId;
		this.address = address;
		this.cid = cid;
		this.rent = rent;
		this.ptid = ptid;
		this.status = status;
		this.description = description;
		this.deposit = deposit;
		this.images = images;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Integer getLandlordId() {
		return landlordId;
	}

	public void setLandlordId(Integer landlordId) {
		this.landlordId = landlordId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getCid() {
		return cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid;
	}

	public Double getRent() {
		return rent;
	}

	public void setRent(Double rent) {
		this.rent = rent;
	}

	public Integer getPtid() {
		return ptid;
	}

	public void setPtid(Integer ptid) {
		this.ptid = ptid;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getDeposit() {
		return deposit;
	}

	public void setDeposit(Double deposit) {
		this.deposit = deposit;
	}

	public String getImages() {
		return images;
	}

	public void setImages(String images) {
		this.images = images;
	}
}
