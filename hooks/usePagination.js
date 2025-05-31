
import { useState, useMemo } from 'react';

// interface UsePaginationProps<T> {
//   data: T[];
//   initialItemsPerPage?: number;
//   initialPage?: number;
// }

// interface UsePaginationReturn<T> {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   itemsPerPage: number;
//   paginatedData: T[];
//   setCurrentPage: (page: number) => void;
//   setItemsPerPage: (itemsPerPage: number) => void;
//   nextPage: () => void;
//   prevPage: () => void;
//   goToFirstPage: () => void;
//   goToLastPage: () => void;
// }

export const usePagination = ({
  data,
  initialItemsPerPage = 10,
  initialPage = 1,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // Handle page change with bounds checking
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const setItemsPerPage = (newItemsPerPage) => {
    setItemsPerPageState(newItemsPerPage);
    // Reset to first page when changing items per page
    setCurrentPage(1);
  };

  // Navigation functions
  const nextPage = () => handlePageChange(currentPage + 1);
  const prevPage = () => handlePageChange(currentPage - 1);
  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => handlePageChange(totalPages);

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData,
    setCurrentPage: handlePageChange,
    setItemsPerPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
  };
};
