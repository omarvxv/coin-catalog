import React, {useState} from "react";
import {Admin, HeaderBlock, Hierarchy, PageName, AccountCommands} from "./styles";
import user from '../../img/user.png';
import {logout} from '../../redux/actions/auth';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";

const PageHeader = ({children, homePage, authorised, role, logout}) => {
    const [toggle, setToggle] = useState(false);
    const login = localStorage.getItem('login');

    return <>
        <HeaderBlock>
            <PageName>{children}</PageName>
            <img src={user} alt={user}/>
            {authorised ? <Admin onClick={() => setToggle(!toggle)}>{login}</Admin>
            : <Link to="login"><Admin>Log in</Admin></Link>}

            <CSSTransition
                in={toggle}
                classNames="user"
                timeout={300}
                mountOnEnter
                unmountOnExit>
                <AccountCommands>
                    {role === 'admin' &&
                    <Link to="/admin/" onClick={() => setToggle(false)}>Admin panel</Link>}
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
    role: state.auth.role,
})

export default connect(mapStateToProps, {logout})(PageHeader);