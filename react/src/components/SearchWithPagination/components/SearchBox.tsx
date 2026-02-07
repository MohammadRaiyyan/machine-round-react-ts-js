import { memo, useCallback, useState, type ChangeEvent } from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchBoxProps {
  handleSearch: (value: string) => void;
}

function SearchBox(props: SearchBoxProps) {
  const debounce = useDebounce(props.handleSearch);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    debounce(value);
  }, []);
  console.log("Rendering searchbox");
  return (
    <input
      type="search"
      placeholder="Search post by name..."
      onChange={handleChange}
      value={searchTerm}
    />
  );
}

export default memo(SearchBox);
