export default function Pagination ({pageNumber, pages, setPageNumber, numberOfPages }) {

    let middlePagination;
    console.log("PAGES: " + numberOfPages)
    if(numberOfPages <= 5){
        middlePagination = [...Array(numberOfPages)].map((_, idx) => (
            <button className="pagination"
                key={idx+1}
                onClick={() => setPageNumber(idx + 1)}
                disabled={pageNumber === idx + 1}>
                {idx + 1}
            </button>
        ))       
    } else {
        const startValue = Math.floor((((pageNumber - 1) / 5)) * 5);

        console.log("START VALUE: " + startValue)


        middlePagination = (
            <>
                {[...Array(5)].map((_, idx) => (
                    <button 
                        key={startValue + idx + 1}
                        disabled={pageNumber === startValue + idx + 1}
                        onClick={() => setPageNumber(startValue + idx + 1)}
                    >                
                     {startValue + idx + 1}   
                    </button>                    
                ))}

                <button>...</button>

                <button
                    onClick={() => setPageNumber(numberOfPages)}
                >
                    {numberOfPages}
                </button>
            </>
        )

        if(pageNumber > 5){
            if((numberOfPages - pageNumber) >= 5){
                middlePagination= (
                    <>
                        <button onClick={() => setPageNumber(1)}>1</button>
                        <button>...</button>
                        <button onClick={() => setPageNumber(startValue)}>{startValue}</button>
                        {[...Array(5)].map((_, idx) => (
                            <button 
                                key={startValue + idx + 1}
                                disabled={pageNumber === startValue + idx + 1}
                                onClick={() => setPageNumber(startValue + idx + 1)}
                            >                
                            {startValue + idx + 1}   
                            </button>                    
                        ))}

                        <button>...</button>

                        <button
                            onClick={() => setPageNumber(numberOfPages)}
                        >
                            {numberOfPages}
                        </button>
                    </>
                )
            } else {
                let amountLeft = numberOfPages-pageNumber + 5;
                middlePagination= (
                    <>
                        <button onClick={() => setPageNumber(1)}>1</button>
                        <button>...</button>
                        <button onClick={() => setPageNumber(startValue)}>{startValue}</button>
                        {[...Array(amountLeft)].map((_, idx) => (
                            <button 
                                key={startValue + idx + 1}
                                style={numberOfPages < startValue + idx + 1 ? {display:"none"} : null}
                                disabled={pageNumber === startValue + idx + 1}
                                onClick={() => setPageNumber(startValue + idx + 1)}
                            >                
                            {startValue + idx + 1}   
                            </button>                    
                        ))}
                    </>
                )
            }

        }
    }
   

    return pages.length > 1 && (
       <div className="pagination">
          <button className="pagination__prev" 
          onClick={() => setPageNumber(pageNumber => pageNumber - 1)}
          disabled={pageNumber === 1}>&#171; prev</button>
          {middlePagination}
          <button className="pagination__next"
          onClick={() => setPageNumber(pageNumber => pageNumber + 1)}
          disabled={pageNumber === pages}>next &#187;</button>
       </div>
    )

}