import React, { useState } from "react";

const BookProperty = () => {
  const [booking, setBooking] = useState({
    bookingId: "",
    propertyId: "",
    propertyName: "",
    moveInDate: "",
    duration: "",
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    alert("Property Booked Successfully!");
    console.log(booking);
  };

  if(name==="duration" && value<0){
    return ;
  }
  return (
    <div>
      <h2>Book Property</h2>

      <form onSubmit={handleBooking}>
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <tbody>
                 <tr>
              <td>Property ID</td>
              <td>
                <input
                  type="text"
                  name="propertyId"
                  value={booking.propertyId}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Booking ID</td>
              <td>
                <input
                  type="text"
                  name="bookingId"
                  value={booking.bookingId}
                  onChange={handleChange}
                />
              </td>
            </tr>

       

            <tr>
              <td>Property Name</td>
              <td>
                <input
                  type="text"
                  name="propertyName"
                  value={booking.propertyName}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Move-In Date</td>
              <td>
                <input
                  type="date"
                  name="moveInDate"
                  value={booking.moveInDate}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Rental Duration (Months)</td>
              <td>
                <input
                  type="number"
                  name="duration"
                  min="0"
                  value={booking.duration}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center">
                <button type="submit">Book Property</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default BookProperty;