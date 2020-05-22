import React, {useEffect} from "react";
import PageHeader from "../styled-components/PageHeader";
import Style from './list.module.scss';
import {connect} from 'react-redux';
import SearchLine from "../styled-components/SearchLine";
import CoinPreview from "../CoinPreview/CoinPreview";
import Pagination from "../Pagination/Pagination";
import {clearList, getCoins} from "../../redux/actions/coinList";
import {clearCriteria} from "../../redux/actions/searchCriteria";
import CoinListGhost from "./CoinListGhost";

function CoinList({getCoins, list, clearList, searchCriteria, ...props}) {

    useEffect(() => {
        getCoins({...searchCriteria, ...props});
        return clearList;
    }, [searchCriteria]);

    return <div className="container">
                <PageHeader showLink>List of the coins</PageHeader>
                <SearchLine/>
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
    offset: state.searchCriteria.offset
})

export default connect(mapStateToProps, {getCoins, clearList, clearCriteria})(CoinList);