import React from "react";
import Select from "react-select";
import { useState } from "react";

function SortBy() {
  const [selectedOption, setSelectedOption] = useState({
    value: "Most Popular",
    label: "Most Popular",
  });
  const options = [
    { value: "Most Popular", label: "Most Popular" },
    { value: "Most Recent", label: "Most Recent" },
    { value: "A-Z", label: "A-Z" },
  ];

  function handleChange(option) {
    setSelectedOption(option);
  }

  return (
    <Select value={selectedOption} options={options} onChange={handleChange} />
  );
}

export default SortBy;
