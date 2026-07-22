import React from "react";

const ViewTokenPayments = () => {
  const payments = [
    {
      id: 1,
      property: "2BHK Apartment",
      amount: 5000,
      date: "2025-06-15",
      status: "Paid",
    },
    {
      id: 2,
      property: "1BHK Flat",
      amount: 3000,
      date: "2025-06-18",
      status: "Paid",
    },
  ];

  return (
    <div className="container">
      <h2>Token Payment History</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Property</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.property}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.date}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTokenPayments;