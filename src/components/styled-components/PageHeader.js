import React, {useState} from "react";
import {UserName, HeaderBlock, Hierarchy, PageName, AccountCommands, User} from "./styles";
import {logout} from '../../redux/actions/auth';
import {connect} from 'react-redux';
import avatar from '../../img/anonym.png'
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import Skeleton from "react-loading-skeleton";

const PageHeader = ({children, homePage, authorised, checking, role, logout}) => {
    const [toggle, setToggle] = useState(false);
    const login = localStorage.getItem('login');

    return <>
        <HeaderBlock>
            <PageName>{children}</PageName>
            <User>
                {checking ? <>
                    <Skeleton circle={true} height="2rem" width="2rem"/>&nbsp;
                    <Skeleton width="8rem" height="1.5rem"/></> : authorised ? <>
                        <img src={avatar} alt="user"/>
                        <UserName onClick={() => setToggle(!toggle)}>Hi, {login}</UserName></> :
                    <Link to="/login/"><UserName>Log in</UserName></Link>}
            </User>

            <CSSTransition in={toggle} classNames="user" timeout={300} mountOnEnter unmountOnExit>
                <AccountCommands>
                    {role === 'admin' && <Link to="/admin/" onClick={() => setToggle(false)}>Admin panel</Link>}
                    <Link to="/feedback/" onClick={() => setToggle(false)}>Send feedback</Link>
                    <Link to="/" onClick={() => {
                        logout();
                        setToggle(false);
                    }}>Log out</Link>
                </AccountCommands>
            </CSSTransition>
        </HeaderBlock>
        {!homePage && (<Hierarchy><Link to="/">Homepage</Link> - {children}</Hierarchy>)}
    </>
};

const mapStateToProps = state => ({
    authorised: state.auth.authorised,
    checking: state.auth.checking,
    role: state.auth.role,
})

export default connect(mapStateToProps, {logout})(PageHeader);