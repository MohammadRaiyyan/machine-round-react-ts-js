import { memo } from "react";

interface PaginationProps {
  currentPage: string;
  currentLimit: string;
  totalPages: number;
  handlePageChange: (newPage: string) => void;
  handleLimitChange: (newLimit: string) => void;
}
function Pagination(props: PaginationProps) {
  return (
    <div>
      <button
        onClick={() => props.handlePageChange(`${+props.currentPage - 1}`)}
        disabled={+props.currentPage <= 0}
      >
        Prev
      </button>
      <p>Current Page:{props.currentPage}</p>
      <button
        disabled={+props.currentPage >= props.totalPages}
        onClick={() => props.handlePageChange(`${+props.currentPage + 1}`)}
      >
        Next
      </button>
      <select
        onChange={(e) => props.handleLimitChange(e.target.value)}
        value={props.currentLimit}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
    </div>
  );
}

export default memo(Pagination);
