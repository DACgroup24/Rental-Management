package com.rental.property.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.rental.property.dto.PropertyResponseDTO;
import com.rental.property.entities.City;
import com.rental.property.entities.Property;
import com.rental.property.entities.PropertyType;
import com.rental.property.entities.User;
import com.rental.property.repositories.CityRepository;
import com.rental.property.repositories.PropertyRepository;
import com.rental.property.repositories.PropertyTypeRepository;
import com.rental.property.repositories.UserRepository;

@Service
public class PropertyService {

	@Autowired
	PropertyRepository propertyrepo;

	@Autowired
	CityRepository cityRepository;

	@Autowired
	PropertyTypeRepository propertyTypeRepository;

	@Autowired
	UserRepository userRepository;

	// ---------------------------------------------------------------
	// Enrichment helpers: turn raw Property rows (which only carry
	// cid / ptid / landlordId foreign keys) into PropertyResponseDTOs
	// that already contain the resolved city / type / landlord names.
	// ---------------------------------------------------------------

	private List<PropertyResponseDTO> enrich(List<Property> properties) {
		Set<Integer> cids = new HashSet<>();
		Set<Integer> ptids = new HashSet<>();
		Set<Integer> landlordIds = new HashSet<>();

		for (Property p : properties) {
			if (p.getCid() != null)
				cids.add(p.getCid());
			if (p.getPtid() != null)
				ptids.add(p.getPtid());
			if (p.getLandlordId() != null)
				landlordIds.add(p.getLandlordId());
		}

		Map<Integer, String> cityMap = new HashMap<>();
		if (!cids.isEmpty()) {
			for (City c : cityRepository.findAllById(cids)) {
				cityMap.put(c.getCid(), c.getCname());
			}
		}

		Map<Integer, String> typeMap = new HashMap<>();
		if (!ptids.isEmpty()) {
			for (PropertyType pt : propertyTypeRepository.findAllById(ptids)) {
				typeMap.put(pt.getPtid(), pt.getTypename());
			}
		}

		Map<Integer, String> landlordMap = new HashMap<>();
		if (!landlordIds.isEmpty()) {
			for (User u : userRepository.findAllById(landlordIds)) {
				landlordMap.put(u.getUid(), u.getFullName());
			}
		}

		List<PropertyResponseDTO> result = new ArrayList<>();
		for (Property p : properties) {
			result.add(toDTO(p, cityMap, typeMap, landlordMap));
		}
		return result;
	}

	private PropertyResponseDTO toDTO(Property p, Map<Integer, String> cityMap, Map<Integer, String> typeMap,
			Map<Integer, String> landlordMap) {
		PropertyResponseDTO dto = new PropertyResponseDTO();
		dto.setPid(p.getPid());
		dto.setLandlordId(p.getLandlordId());
		dto.setLandlordName(p.getLandlordId() != null ? landlordMap.get(p.getLandlordId()) : null);
		dto.setAddress(p.getAddress());
		dto.setCid(p.getCid());
		dto.setCityName(p.getCid() != null ? cityMap.get(p.getCid()) : null);
		dto.setRent(p.getRent());
		dto.setPtid(p.getPtid());
		dto.setPropertyTypeName(p.getPtid() != null ? typeMap.get(p.getPtid()) : null);
		dto.setStatus(p.getStatus());
		dto.setDescription(p.getDescription());
		dto.setDeposit(p.getDeposit());
		dto.setImages(p.getImages());
		return dto;
	}

	private PropertyResponseDTO enrichOne(Property property) {
		if (property == null)
			return null;
		return enrich(List.of(property)).get(0);
	}

	// ---------------------------------------------------------------
	// Public API used by the controller
	// ---------------------------------------------------------------

	public List<PropertyResponseDTO> getAll() {
		return enrich(propertyrepo.findAll());
	}

	public PropertyResponseDTO getById(int pid) {
		Optional<Property> oprop = propertyrepo.findById(pid);
		return oprop.map(this::enrichOne).orElse(null);
	}

	public PropertyResponseDTO save(Property property) {
		return enrichOne(propertyrepo.save(property));
	}

	public boolean delete(int pid) {
		Optional<Property> oprop = propertyrepo.findById(pid);
		boolean flag = false;
		if (oprop.isPresent()) {
			propertyrepo.delete(oprop.get());
			flag = true;
		}
		return flag;
	}

	public List<PropertyResponseDTO> getPropertiesByName(String name) {
		return enrich(propertyrepo.findByAddressContainingIgnoreCase(name));
	}

	public List<PropertyResponseDTO> getPropertiesByCity(String cname) {
		return enrich(propertyrepo.findByCityName(cname));
	}

	public List<PropertyResponseDTO> getPropertiesByType(String typename) {
		return enrich(propertyrepo.findByPropertyTypeName(typename));
	}

	public List<PropertyResponseDTO> getPropertiesByLandlord(Integer landlordId) {
		return enrich(propertyrepo.findByLandlordId(landlordId));
	}

	// Combined search used by the "Available Properties" page: optional
	// city + optional property type, either or both may be blank.
	public List<PropertyResponseDTO> search(String city, String type) {
		List<Property> all = propertyrepo.findAll();
		List<PropertyResponseDTO> enriched = enrich(all);

		boolean hasCity = StringUtils.hasText(city);
		boolean hasType = StringUtils.hasText(type);

		List<PropertyResponseDTO> result = new ArrayList<>();
		for (PropertyResponseDTO dto : enriched) {
			boolean cityOk = !hasCity
					|| (dto.getCityName() != null && dto.getCityName().toLowerCase().contains(city.toLowerCase()));
			boolean typeOk = !hasType || (dto.getPropertyTypeName() != null
					&& dto.getPropertyTypeName().toLowerCase().contains(type.toLowerCase()));
			if (cityOk && typeOk) {
				result.add(dto);
			}
		}
		return result;
	}

	public PropertyResponseDTO updateProperty(int pid, Property property) {
		Property existing = propertyrepo.findById(pid).get();
		existing.setLandlordId(property.getLandlordId());
		existing.setAddress(property.getAddress());
		existing.setCid(property.getCid());
		existing.setRent(property.getRent());
		existing.setPtid(property.getPtid());
		existing.setStatus(property.getStatus());
		existing.setDescription(property.getDescription());
		existing.setDeposit(property.getDeposit());
		existing.setImages(property.getImages());

		return enrichOne(propertyrepo.save(existing));
	}

	public PropertyResponseDTO updPropertyPatch(int pid, Property property) {
		Property existing = propertyrepo.findById(pid).get();

		if (property.getLandlordId() != null) {
			existing.setLandlordId(property.getLandlordId());
		}
		if (property.getAddress() != null) {
			existing.setAddress(property.getAddress());
		}
		if (property.getCid() != null) {
			existing.setCid(property.getCid());
		}
		if (property.getRent() != null) {
			existing.setRent(property.getRent());
		}
		if (property.getPtid() != null) {
			existing.setPtid(property.getPtid());
		}
		if (property.getStatus() != null) {
			existing.setStatus(property.getStatus());
		}
		if (property.getDescription() != null) {
			existing.setDescription(property.getDescription());
		}
		if (property.getDeposit() != null) {
			existing.setDeposit(property.getDeposit());
		}
		if (property.getImages() != null) {
			existing.setImages(property.getImages());
		}

		return enrichOne(propertyrepo.save(existing));
	}
}
