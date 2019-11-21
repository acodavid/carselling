import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="btn-group">
            {pageNumbers.map(number => (

                <button key={number} onClick={() => paginate(number)} className='btn btn-secondary'>
                    {number}
                </button>

            ))}
        </div>
    );
};

export default Pagination;