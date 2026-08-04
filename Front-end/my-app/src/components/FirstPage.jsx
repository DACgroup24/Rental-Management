export default function FirstPage() {

  const properties = [
    {
      id: 1,
      title: "2 BHK Apartment",
      location: "Mumbai",
      price: "₹15,000/month",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    },
    {
      id: 2,
      title: "Luxury Villa",
      location: "Pune",
      price: "₹35,000/month",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    },
    {
      id: 3,
      title: "Studio Apartment",
      location: "Navi Mumbai",
      price: "₹10,000/month",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
  ];

  return (
    <>
      <h2 className="mb-4">
        Available Properties
      </h2>

      <div className="row">

        {properties.map((property) => (
          <div
            key={property.id}
            className="col-md-4 mb-4"
          >
            <div className="card shadow-sm h-100">

              <img
                src={property.image}
                className="card-img-top"
                alt={property.title}
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">

                <h5>{property.title}</h5>

                <p className="text-muted">
                  {property.location}
                </p>

                <h6 className="text-success">
                  {property.price}
                </h6>

                <button className="btn btn-primary w-100">
                  View Details
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </>
  );
}