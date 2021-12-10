export default function Pagination ({page, pages, setPageNumber }) {

    return(
        pages.map(pageIndex => {
            return(
            <button className="pageBtn" onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
            )
          })
    )

}