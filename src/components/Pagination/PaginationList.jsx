import Pagination from "react-js-pagination";
import PropTypes from 'prop-types';
import s from './PaginationList.module.css'
import React from 'react';

PaginationList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  displayedItems: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

function PaginationList({currentPage, itemsPerPage, totalPages, displayedItems, handlePageChange}) {
  return (
     <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalPages}
            pageRangeDisplayed={displayedItems}
            onChange={handlePageChange}
            innerClass={s.paginationList}
            activeClass={s.activeItem}
            itemClass={s.paginationItem}
            linkClass={s.link}
            activeLinkClass={s.activeLink}
            prevPageText="prev"
            nextPageText="next"  
          />
  );
}

export default PaginationList;

