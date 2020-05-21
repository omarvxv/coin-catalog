import React from "react";
import {connect} from 'react-redux';
import Form from "./Form";
import {addCoin} from "../../redux/actions/coin";

const AddCoin = ({addCoin, coin}) =>
    <Form {...{onSubmit: () => addCoin(coin)}}/>

const mapStateToProps = state => ({
    coin: state.coin.coin,
});

export default connect(mapStateToProps, {addCoin})(AddCoin);