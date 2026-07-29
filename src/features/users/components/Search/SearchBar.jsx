import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/userSlice";

import '../../../chat/styles/chat.css';

const SearchBar = () => {
  const dispatch = useDispatch();

  const search = useSelector((state) => state.users.search);

  return (
    <div className="search-container">
      <div className="search-box">
        <FiSearch className="search-icon" />

        <input type="text" placeholder="Search users..." value={search} onChange={(e) => dispatch(setSearch(e.target.value))}/>
      </div>
    </div>
  );
};

export default SearchBar;