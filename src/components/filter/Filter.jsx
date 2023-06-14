import "./Filter.scss";

const Filter = ({ setFilter, count }) => {
  return (
    <div className="counter-filter-container">
      <div className="podcast-counter">{count}</div>
      <input
        className="filter-input"
        type="text"
        placeholder="Filter podcasts..."
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default Filter;
