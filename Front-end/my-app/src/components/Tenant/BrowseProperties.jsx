import React from "react";

const BrowseProperties = () => {
  const properties = [
    {
      id: 1,
      name: "2BHK Apartment",
      location: "Pune",
      rent: 12000,
    },
    {
      id: 2,
      name: "1BHK Flat",
      location: "Mumbai",
      rent: 15000,
    },
    {
      id: 3,
      name: "3BHK House",
      location: "Nagpur",
      rent: 18000,
    },
  ];

  return (
    <div className="container">
      <h2>Available Properties</h2>

      {properties.map((property) => (
        <div key={property.id} className="card">
          <h3>{property.name}</h3>
          <p>Location: {property.location}</p>
          <p>Rent: ₹{property.rent}</p>
          <button>Book Now</button>
        </div>
      ))}
    </div>
  );
};

export default BrowseProperties;