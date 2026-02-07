import { useCallback, useState } from "react";
import { getPosts } from "../services/getPostAPI";
import type { IPostFilter } from "../types/posts";
import useFetch from "./useFetch";

function usePosts() {
  const [filter, _setFilter] = useState<IPostFilter>({
    skip: "0",
    limit: "10",
    q: "",
  });
  const fetchPosts = useCallback(() => getPosts(filter), [filter]);

  const { data, error, isPending } = useFetch(fetchPosts);

  const setFilter = useCallback((patch: Partial<IPostFilter>) => {
    _setFilter((prev) => ({ ...prev, ...patch }));
  }, []);

  return {
    isPending,
    data,
    error,
    filter,
    setFilter,
  };
}

export default usePosts;
