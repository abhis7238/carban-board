import React from "react";
import "../styles/TicketCard.css";

function TicketCard({ title, description }) {
  return (
    <div className="ticket-card">
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
}

export default TicketCard;
