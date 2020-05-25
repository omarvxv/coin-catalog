import React, { useEffect } from "react";
import Comments from "../Comments/Comments";
import { connect } from 'react-redux'
import { getComments } from "../../redux/actions/comments";
import Style from './feedback.module.scss'
import PageHeader from "../styled-components/PageHeader";

function Feedback ({getComments}) {
    useEffect(() => {
        getComments();
    }, []);

    return <div className="container">
        <PageHeader>Send feedback</PageHeader>
        <div className={Style.feedBackForm}><Comments/></div>
    </div>
}

export default connect(null, { getComments })(Feedback)