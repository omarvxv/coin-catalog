import React from "react";
import {connect} from 'react-redux';
import Form from "./Form";
import {editCoin} from "../../redux/actions/coin";

const EditCoin = ({coin, editCoin, id}) =>
    <Form {...{onSubmit: () => {editCoin(coin)}, id, edit: true}}/>

const mapStateToProps = state => ({
    coin: state.coin.coin,
});

export default connect(mapStateToProps, {editCoin})(EditCoin);