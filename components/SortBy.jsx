import Select from "react-select";
import { useState } from "react";
import Switch from "react-switch";
import arrowUp from "../src/assets/arrow-up.svg";
import arrowDown from "../src/assets/arrow-down.svg";

function SortBy({ changeSortBy, changeOrder, changeToggled }) {
  const [selectedOption, setSelectedOption] = useState({
    value: "Most Popular",
    label: "Most Popular",
  });

  const [order, setOrder] = useState("order=desc");
  const [checked, setChecked] = useState(false);

  const options = [
    { value: "Most Popular", label: "Most Popular" },
    { value: "Most Recent", label: "Most Recent" },
    { value: "Article Title A-Z", label: "Article Title A-Z" },
    { value: "Author A-Z", label: "Author A-Z" },
  ];

  const sortByOptions = [
    "sort_by=votes",
    "sort_by=created_at",
    "sort_by=title",
    "sort_by=author",
  ];

  function handleChange(option) {
    setSelectedOption(option);
    const indexOfOption = options.indexOf(option);
    changeSortBy(sortByOptions[indexOfOption]);
  }

  function handleToggle() {
    const newOrder = order === "order=desc" ? "order=asc" : "order=desc";
    const newChecked = !checked;

    setOrder(newOrder);
    changeOrder(newOrder);
    setChecked(newChecked);
    changeToggled(newChecked);
  }

  return (
    <section className="sorting-section">
      <div className="select-wrapper">
        <Select
          value={selectedOption}
          options={options}
          onChange={handleChange}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#1e1e1e",
              borderRadius: "10px",
              border: "1px solid #333",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1e1e1e",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#333" : "#1e1e1e",
              color: "#888",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#888",
            }),
          }}
        />
      </div>
      <button
        className="order-toggle"
        onClick={handleToggle}
        aria-label="toggle order"
      >
        <img
          src={checked ? arrowDown : arrowUp}
          alt={checked ? "descending" : "ascending"}
          style={{ width: "16px", height: "16px" }}
        />
      </button>
    </section>
  );
}

export default SortBy;
