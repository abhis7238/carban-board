import React, { useState } from "react";

function Filter() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Filter;
