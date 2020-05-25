import React, {useEffect} from "react";
import PageHeader from "../styled-components/PageHeader";
import SearchLine from "../styled-components/SearchLine";
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Style from './admin.module.scss';
import CoinPreview from "../CoinPreview/CoinPreview";
import ButtonsToManage from "../styled-components/ButtonsToManage";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton/lib";
import AddCoin from "./AddCoin";
import EditCoin from "./EditCoin";
import {authentication} from "../../redux/actions/auth";
import {deleteCoin} from "../../redux/actions/coin";
import {clearList, getCoins} from "../../redux/actions/coinList";

function Admin({authorised, checking, list, getCoins, deleteCoin, authentication, clearList, keyword, role}) {

    useEffect(() => {
        !authorised ? authentication() : getCoins({keyword});
        return clearList;
    }, [authorised, keyword]);

    return checking ? <Skeleton/> : authorised && role === 'admin' ?
        <div className="container">
            <PageHeader>Admin panel</PageHeader>
            <Switch>
                <Route path="/admin/add-coin/"><AddCoin/></Route>
                <Route path="/admin/edit/:id" render={props => <EditCoin {...props.match.params}/>}/>
                <Route>
                    <SearchLine admin/>
                    <div className={Style.list}>
                        {list.map(coin => <div key={coin.id} className={Style.coin}>
                            <CoinPreview {...coin} admin/>
                            <ButtonsToManage panel
                                             onDelete={() => deleteCoin(coin.id)}
                                             id={coin.id}/>
                        </div>)}
                    </div>
                    <div className={Style.addCoin}>
                        <div className={Style.round}>+</div>
                        <div className={Style.link}>
                            <Link to="/admin/add-coin/">Add a new coin</Link>
                        </div>
                    </div>
                </Route>
            </Switch>
        </div> : <Redirect to="/login/"/>
}

const mapStateToProps = state => ({
    list: state.coinList.list,
    role: state.auth.role,
    authorised: state.auth.authorised,
    checking: state.auth.checking,
    keyword: state.searchCriteria.searchCriteria.keyword
})

export default connect(mapStateToProps, {getCoins, deleteCoin, authentication, clearList})(Admin);