import React from "react";
import PageHeader from "../styled-components/PageHeader";
import InputField from "../styled-components/InputField";
import { Redirect } from 'react-router-dom';
import Style from './admin.module.scss'
import {Button} from "../styled-components/styles";
import {connect} from 'react-redux';
import {authorization, typeToLogin} from "../../redux/actions/auth";

function Login({ authorization, authorised, typeToLogin, password, login}){
        return !authorised ? <div className="container">
                    <PageHeader>Admin panel</PageHeader>
                    <div className={Style.auth}>
                        <InputField name="login" value={login} onChange={typeToLogin}>Login</InputField>
                        <InputField name="password" value={password} onChange={typeToLogin}>Password</InputField>
                        <Button type="submit" onClick={() => authorization({login, password})}>Sign in</Button>
                    </div>
                </div> : <Redirect to="/admin/"/>
}

const mapStateToProps = state => ({
    authorised: state.auth.authorised,
    login: state.auth.login,
    password: state.auth.password
})

export default connect(mapStateToProps, {authorization, typeToLogin})(Login)