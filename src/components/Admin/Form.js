import React, {useEffect, useState} from "react";
import Style from "./admin.module.scss";
import {connect} from 'react-redux';
import InputField from "../styled-components/InputField";
import Description from "../styled-components/Description";
import ButtonsToManage from "../styled-components/ButtonsToManage";
import {Redirect} from "react-router-dom";
import {changeHandler, clearCoinInfo, clearFields, getCoinInfo} from "../../redux/actions/coin";

function Form({coin, changeHandler, onSubmit, getCoinInfo, clearFields, clearCoinInfo, id, query, edit}) {
    const [canceled, cancel] = useState(false);

    useEffect(() => {
        edit && getCoinInfo(id);
        return () => {
            canceled && clearFields();
            clearCoinInfo();
        }
    }, []);
    // query меняется при завершении запроса. см actions/Coin.js :63
    return (!query || canceled) ? <Redirect to="/admin/"/> :
        <div className={Style.fieldsScreen}>
            <div className={Style.column}>
                <InputField name="name" value={coin.name || ''} onChange={changeHandler}>Coin name</InputField>
                <InputField name="denomination" value={coin.denomination || ''} onChange={changeHandler}>Face
                    value</InputField>
                <InputField name="year" value={coin.year || ''} onChange={changeHandler}>Year of issue</InputField>
                <InputField name="price" value={coin.price || ''} onChange={changeHandler}>Price</InputField>
                <InputField name="country" value={coin.country || ''} onChange={changeHandler}>Country</InputField>
                <InputField name="composition" value={coin.composition || ''}
                            onChange={changeHandler}>Composition</InputField>
            </div>
            <div className={Style.column}>
                <Description name="shortdesc" value={coin.shortdesc || ''} onChange={changeHandler}>Short
                    description</Description>
                <Description name="description" value={coin.description || ''} onChange={changeHandler}>Long
                    description</Description>
                <InputField name="quality" value={coin.quality || ''} onChange={changeHandler}>Quality of the
                    coin</InputField>
                <InputField name="weight" value={coin.weight || ''} onChange={changeHandler}>Weight</InputField>
            </div>
            <div className={Style.column}>
                <div className={Style.fields}>
                    <InputField name="group" value={coin.group || ''} onChange={changeHandler}>Group</InputField>
                    <InputField name="avers" value={coin.avers || ''} onChange={changeHandler}>Link to obverse
                        image</InputField>
                    <InputField name="revers" value={coin.revers || ''} onChange={changeHandler}>Link to reverse
                        image</InputField>
                </div>
                <div className={Style.buttons}>
                    <ButtonsToManage onDelete={() => cancel(true)} onEdit={onSubmit}/>
                </div>
            </div>
        </div>
}

const mapStateToProps = state => ({
    coin: state.coin.coin,
    query: state.coin.query,
    loaded: state.coin.loaded
})

export default connect(mapStateToProps, {getCoinInfo, changeHandler, clearFields, clearCoinInfo})(Form);