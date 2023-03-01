import React from "react";

import '../css/content.css';

const pagination = ({currentPage,pageNumber,pageSize,paginate}) => {

    return (
    <div>
    <div id="pagination">
      <button id="backward" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
        Previous
      </button>
      {currentPage}
      <button id = "forward" disabled={currentPage === Math.ceil(pageNumber / pageSize)} onClick={() => paginate(currentPage + 1)}>
        Next
      </button>
    </div>
    </div>

    );
}
 
export default pagination;