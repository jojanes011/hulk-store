import { useEffect, useState } from 'react';

interface PaginationInterface {
  onPaginateItems: any;
  items: Array<any>;
}

const Pagination = ({
  onPaginateItems = () => {},
  items = [],
}: PaginationInterface) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [pageStateNumbers, setPageStateNumbers] = useState([]);
  const [indexOfLastItem, setIndexOfLastItem] = useState(
    currentPage * itemsPerPage
  );
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(
    indexOfLastItem - itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage === pageStateNumbers[pageStateNumbers.length - 1]) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleBeforePage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const pg = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i += 1) {
      pg.push(i);
    }
    setPageStateNumbers(pg);
  }, []);

  useEffect(() => {
    setIndexOfLastItem(currentPage * itemsPerPage);
  }, [currentPage]);

  useEffect(() => {
    setIndexOfFirstItem(indexOfLastItem - itemsPerPage);
  }, [indexOfLastItem]);

  useEffect(() => {
    const ft = JSON.parse(JSON.stringify(items));
    onPaginateItems(ft.slice(indexOfFirstItem, indexOfLastItem));
  }, [indexOfFirstItem]);

  return (
    <div>
      <button
        type='button'
        onClick={handleBeforePage}
        className='h-8 w-8 text-text hover:text-black border border-text hover:border-black'
      >
        <i className='fas fa-chevron-left text-sm ' />
      </button>
      <button
        type='button'
        onClick={handleNextPage}
        className='h-8 w-8 text-text hover:text-black border border-text hover:border-black'
      >
        <i className='fas fa-chevron-right text-sm ' />
      </button>
    </div>
  );
};

export default Pagination;
