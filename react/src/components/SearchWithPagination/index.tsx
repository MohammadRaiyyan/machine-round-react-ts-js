import { useCallback } from "react";
import Pagination from "./components/Pagination";
import Posts from "./components/Posts";
import SearchBox from "./components/SearchBox";
import usePosts from "./hooks/usePosts";

function SearchWithPagination() {
  const { isPending, data, error, filter, setFilter } = usePosts();

  const handleSearch = useCallback((query: string) => {
    setFilter({ q: query });
  }, []);

  const handlePageChange = useCallback((newPage: string) => {
    setFilter({ skip: newPage });
  }, []);

  const handleLimitChange = useCallback((newLimit: string) => {
    setFilter({ limit: newLimit });
  }, []);

  return (
    <div>
      <SearchBox handleSearch={handleSearch} />
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && <Posts posts={data.posts} />}
      <Pagination
        currentLimit={filter.limit}
        currentPage={filter.skip}
        totalPages={data?.total || 0}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </div>
  );
}

export default SearchWithPagination;
