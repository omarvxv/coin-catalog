import ReactPaginate from 'react-paginate';
import './paginate.scss';
import {connect} from 'react-redux';
import React, {useEffect} from "react";
import {pageChange} from "../../redux/actions/coinList";

function Pagination({count, limit, pageChange}) {

    useEffect(() => {
        return () => pageChange(0);
    }, []);

    const pagesCount = count / limit;

    return pagesCount > 0 ?
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
        /> : null;
}

const mapStateToProps = state => ({
    count: state.coinList.count,
    limit: state.searchCriteria.limit,
    offset: state.searchCriteria.offset,
})

export default connect(mapStateToProps, {pageChange})(Pagination);