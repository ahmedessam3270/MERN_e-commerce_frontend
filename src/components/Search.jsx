import { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const searchInputQ = useLocation();
  const urlSearch = new URLSearchParams(searchInputQ?.search);
  const searchQuery = urlSearch.getAll("q");
  const [searchInput, setSearchInput] = useState(searchQuery);

  function handleSearch(e) {
    const { value } = e.target;
    setSearchInput(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/");
    }
  }
  return (
    <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
      <input
        type="text"
        placeholder="Search product here...."
        className="w-full outline-none"
        onChange={handleSearch}
        value={searchInput}
      />
      <div className="text-lg min-w-[50px] h-8 bg-slate-600 text-white flex items-center justify-center rounded-r-full">
        <GrSearch />
      </div>
    </div>
  );
}

export default Search;
