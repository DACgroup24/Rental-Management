package com.rental.property.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rental.property.entities.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer> {

	// Custom JPQL search by address / house name keyword
	@Query("SELECT p FROM Property p WHERE LOWER(p.address) LIKE LOWER(CONCAT('%', :address, '%'))")
	List<Property> findByAddressContainingIgnoreCase(@Param("address") String address);

	// Custom JPQL search by city name (cname from city table via cid foreign key)
	@Query("SELECT p FROM Property p WHERE p.cid IN (SELECT c.cid FROM City c WHERE LOWER(c.cname) LIKE LOWER(CONCAT('%', :cname, '%')))")
	List<Property> findByCityName(@Param("cname") String cname);

	// Custom JPQL search by property type name (typename from property-type table
	// via ptid foreign key)
	@Query("SELECT p FROM Property p WHERE p.ptid IN (SELECT pt.ptid FROM PropertyType pt WHERE LOWER(pt.typename) LIKE LOWER(CONCAT('%', :typename, '%')))")
	List<Property> findByPropertyTypeName(@Param("typename") String typename);

	// Search by City ID
	List<Property> findByCid(Integer cid);

	// Search by Property Type ID
	List<Property> findByPtid(Integer ptid);

	// Landlord: fetch all properties owned by a given landlord (uid from user
	// table)
	List<Property> findByLandlordId(Integer landlordId);
}
