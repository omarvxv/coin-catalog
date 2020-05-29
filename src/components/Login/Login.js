import React, {useEffect, useState} from "react";
import PageHeader from "../styled-components/PageHeader";
import InputField from "../styled-components/InputField";
import {Redirect} from 'react-router-dom';
import Style from './login.module.scss'
import {Button} from "../styled-components/styles";
import {connect} from 'react-redux';
import {authorization, typeToLogin, registration} from "../../redux/actions/auth";

function Login({ authorization, registration, registered, authorised, typeToLogin, password, login}){
    useEffect(() => {
        registered && setMode('login');
    }, [registered]);

    const [mode, setMode] = useState('login');

    const values = {
        text: mode === 'login' ? 'You don\'t have an account ? ' : 'You are have an account ? ',
        modeToChange: mode === 'login' ? 'registration' : 'login',
        textOnButton: mode === 'login' ? 'Sign in' : 'Sign up',
        textOnLink: mode === 'login' ? 'Sign up' : 'Sign in',
        onClick: () => {
            return mode === 'login' ?
            authorization({login, password}) :
            registration({login, password})
        }
    }

    return !authorised ? <div className="container">
                <PageHeader>{mode === 'login' ? <>Sign in</> : <>Registration</>}</PageHeader>
                <div className={Style.auth}>
                    <InputField name="login" value={login} onChange={typeToLogin}>Login</InputField>
                    <InputField type="password" name="password" value={password} onChange={typeToLogin}>Password</InputField>
                    <span>{values.text}
                        <span className={Style.reg}
                              onClick={() => setMode(values.modeToChange)}>{values.textOnLink}</span>
                    </span>
                    <Button type="submit" onClick={values.onClick}>{values.textOnButton}</Button>
                </div>
            </div> : <Redirect to="/"/>
}

const mapStateToProps = state => ({
    authorised: state.auth.authorised,
    registered: state.auth.registered,
    login: state.auth.login,
    password: state.auth.password
})

export default connect(mapStateToProps, {authorization, typeToLogin, registration})(Login)