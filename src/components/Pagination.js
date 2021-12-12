export default function Pagination ({pageNumber, pages, setPageNumber }) {

    return pages.length > 1 && (
       <div className="pagination">
          <button className="pagination__prev" 
          onClick={() => setPageNumber(pageNumber => pageNumber - 1)}
          disabled={pageNumber === 1}>&#171;</button>
          {/* {{middlePagination}} */}
          <button className="pagination__next"
          onClick={() => setPageNumber(pageNumber => pageNumber + 1)}
          disabled={pageNumber === pages}>&#187;</button>
       </div>
    )

}