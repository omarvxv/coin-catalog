import React, {useEffect, useState} from "react";
import PageHeader from "../styled-components/PageHeader";
import Style from './list.module.scss';
import {connect} from 'react-redux';
import SearchLine from "../styled-components/SearchLine";
import CoinPreview from "../CoinPreview/CoinPreview";
import Pagination from "../Pagination/Pagination";
import {clearList, getCoins, setLimit} from "../../redux/actions/coinList";
import {clearCriteria} from "../../redux/actions/searchCriteria";
import CoinListGhost from "./CoinListGhost";

function CoinList({getCoins, list, clearList, count, limit, setLimit, searchCriteria, ...props}) {

    const [coinCount, setCoinCount] = useState(limit);

    useEffect(() => {
        getCoins({...searchCriteria, ...props, limit});
        return clearList;
    }, [searchCriteria, limit]);

    return <div className="container">
                <PageHeader>List of the coins</PageHeader>
                <SearchLine/>
                <div className={Style.limit}>
                    Coins on page:&nbsp;<input type="number"
                           max={count}
                           min={1}
                           value={coinCount}
                           onChange={e => setCoinCount(e.target.value)}
                           onBlur={e => {if(limit !== e.target.value) setLimit(e)}} />
                </div>
                <div className={Style.listContainer}>
                    {list.length ?
                        list.map(coin => <CoinPreview key={coin.id} {...coin}/>) :
                        <CoinListGhost/>
                    }
                </div>
                <Pagination/>
            </div>
}

const mapStateToProps = state => ({
    list: state.coinList.list,
    searchCriteria: state.searchCriteria.searchCriteria,
    group: state.searchCriteria.group,
    limit: state.searchCriteria.limit,
    offset: state.searchCriteria.offset,
    count: state.coinList.count,
})

export default connect(mapStateToProps, {getCoins, clearList, clearCriteria, setLimit})(CoinList);