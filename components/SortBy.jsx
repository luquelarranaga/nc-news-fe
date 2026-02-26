import Select from "react-select";
import { useState } from "react";
import { Axios } from "axios";

function SortBy({ changeQuery }) {
  const [selectedOption, setSelectedOption] = useState({
    value: "Most Popular",
    label: "Most Popular",
  });

  const options = [
    { value: "Most Popular", label: "Most Popular" },
    { value: "Most Recent", label: "Most Recent" },
    { value: "Article Title A-Z", label: "Article Title A-Z" },
    { value: "Author A-Z", label: "Author A-Z" },
  ];

  const queryOptions = [
    "?sort_by=votes&order=desc",
    "?order=desc",
    "?sort_by=title&order=asc",
    "?sort_by=author&order=asc",
  ];

  function handleChange(option) {
    setSelectedOption(option);
    const indexOfOption = options.indexOf(option);
    changeQuery(queryOptions[indexOfOption]);
  }

  return (
    <Select value={selectedOption} options={options} onChange={handleChange} />
  );
}

export default SortBy;
