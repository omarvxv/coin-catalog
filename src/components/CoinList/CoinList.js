import React, {useEffect} from "react";
import PageHeader from "../styled-components/PageHeader";
import Style from './list.module.scss';
import {connect} from 'react-redux';
import SearchLine from "../styled-components/SearchLine";
import CoinPreview from "../CoinPreview/CoinPreview";
import Skeleton from "react-loading-skeleton/lib";
import Pagination from "../Pagination/Pagination";
import {clearList, getCoins} from "../../redux/actions/coinList";
import {clearCriteria} from "../../redux/actions/searchCriteria";

function CoinList({getCoins, list, clearList, searchCriteria, ...props}) {

    useEffect(() => {
        getCoins({...searchCriteria, ...props});
        return clearList;
    }, [searchCriteria]);

    return <div className="container">
                <PageHeader showLink>List of the coins</PageHeader>
                <SearchLine isList/>
                <div className={Style.listContainer}>
                    {list.map(coin => coin.id ? <CoinPreview key={coin.id} {...coin}/> : <Skeleton height={120} width={374}/>)}
                </div>
                <Pagination/>
            </div>
}

const mapStateToProps = state => ({
    list: state.coinList.list,
    searchCriteria: state.searchCriteria.searchCriteria,
    group: state.searchCriteria.group,
    limit: state.searchCriteria.limit,
    offset: state.searchCriteria.offset
})

export default connect(mapStateToProps, {getCoins, clearList, clearCriteria})(CoinList);