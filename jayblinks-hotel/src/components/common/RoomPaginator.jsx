import React from 'react';
import PropTypes from 'prop-types';

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber} className={`pag-item ${currentPage === pageNumber ? "active" : ""}`}>
                        <button className='page-link' onClick={() => onPageChange(pageNumber)}>
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

RoomPaginator.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default RoomPaginator;
