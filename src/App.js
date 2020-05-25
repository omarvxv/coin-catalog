import React, {useEffect} from 'react';
import {Route} from "react-router-dom";
import {connect} from 'react-redux';
import './index.css';
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Admin/Login";
import Admin from "./components/Admin/Admin";
import CoinList from "./components/CoinList/CoinList";
import CoinScreen from "./components/CoinScreen/CoinScreen";
import Notification from "./components/styled-components/Notification";
import {getCriteria} from "./redux/actions/searchCriteria";
import { authentication } from "./redux/actions/auth";
import Feedback from "./components/Feedback/Feedback";

function App({getCriteria, authentication}) {

    useEffect(() => {
        authentication();
        getCriteria();
    }, []);

    return <>
        <Notification/>
        <Route path="/coin-screen/:id" render={props => <CoinScreen {...props}/>}/>
        <Route path="/" exact><Homepage/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="/admin"><Admin/></Route>
        <Route path="/feedback/"><Feedback/></Route>
        <Route path="/list/" render={props => <CoinList {...props.match.params}/>}/>
    </>
}

export default connect(null, {getCriteria, authentication})(App);
