import React, {useEffect} from 'react';
import './animation.css';
import {connect} from 'react-redux';
import {CSSTransition} from "react-transition-group";
import {NotificationLine} from "./styles";
import {closeNotification} from "../../redux/actions/notification";

function Notification({message, notify, closeNotification}){

    useEffect(() => {
        setTimeout(() => {
            closeNotification();
        }, 3000);
    }, [notify]);

    return <CSSTransition in={notify} classNames="notification" timeout={300} mountOnEnter unmountOnExit>
                <NotificationLine>{message}</NotificationLine>
            </CSSTransition>
}

const mapStateToProps = state => ({
    message: state.notification.message,
    notify: state.notification.notify
})

export default connect(mapStateToProps, { closeNotification })(Notification);