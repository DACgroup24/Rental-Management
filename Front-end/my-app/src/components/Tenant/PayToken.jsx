import React, { useState } from "react";

const PayToken = () => {
  const [payment, setPayment] = useState({
    paymentId: "",
    bookingId: "",
    propertyId: "",
    tokenAmount: "",
    paymentDate: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Token Payment Successful!");
    console.log(payment);
  };

  return (
    <div>
      <h2>Pay Token Amount</h2>

      <form onSubmit={handleSubmit}>
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "60%" }}
        >
          <tbody>
            <tr>
              <td>Payment ID</td>
              <td>
                <input
                  type="text"
                  name="paymentId"
                  value={payment.paymentId}
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
                  value={payment.bookingId}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Property ID</td>
              <td>
                <input
                  type="text"
                  name="propertyId"
                  value={payment.propertyId}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Token Amount (₹)</td>
              <td>
                <input
                  type="number"
                  name="tokenAmount"
                  value={payment.tokenAmount}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Payment Date</td>
              <td>
                <input
                  type="date"
                  name="paymentDate"
                  value={payment.paymentDate}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Payment Method</td>
              <td>
                <select
                  name="paymentMethod"
                  value={payment.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="">Select Method</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Cash">Cash</option>
                </select>
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center">
                <button type="submit">Pay Token</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default PayToken;