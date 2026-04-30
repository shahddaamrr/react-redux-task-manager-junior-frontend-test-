import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/taskSlice";

function FilterBar() {
  const dispatch = useDispatch();

  // Current selected filter
  const selectedFilter = useSelector((state) => state.tasks.filter);

  const filters = ["All", "High", "Medium", "Low"];

  return (
    <div className="filter-wrapper">
      <p className="section-title">Filter by priority</p>

      <div className="filter-bar">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => dispatch(setFilter(filter))}
            className={selectedFilter === filter ? "active-filter" : ""}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
