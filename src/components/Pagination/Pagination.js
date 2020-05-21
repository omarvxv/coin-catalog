import ReactPaginate from 'react-paginate';
import './paginate.scss';
import {connect} from 'react-redux';
import React, {useEffect, useState} from "react";
import {setOffset} from "../../redux/actions/coinList";

function Pagination({count, limit, pageChange, setLimit}){

    const [coinCount, setCoinCount] = useState(limit);

    useEffect(() => {
        return () => pageChange(0);
    }, []);

    const pagesCount = count/limit;

    return pagesCount > 0 ?
        <div className="paginate">
        <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pagesCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({selected}) => pageChange(selected)}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
    /> <input type="number"
              max={count}
              value={coinCount}
              onChange={e => setCoinCount(e.target.value)}
              onBlur={e => {if(limit !== e.target.value) setLimit(e)}} />
    </div> : null;
}

const mapStateToProps = state => ({
    count: state.coinList.count,
    limit: state.searchCriteria.limit,
    offset: state.searchCriteria.offset,
})

export default connect(mapStateToProps, setOffset)(Pagination);