import React from "react";
import Style from './homepage.module.scss';
import {Link} from "react-router-dom";
import Img from "react-image";
import Skeleton from "react-loading-skeleton/lib";
import {connect} from 'react-redux';
import {setGroup} from "../../redux/actions/searchCriteria";

export default connect(null, {setGroup})(({name, id, img, setGroup}) =>
    <div className={Style.section}>
        <h4>{name}</h4>
        <Link to="/list/" onClick={() => {setGroup(id)}}>Show all ></Link>
        <Img src={img} alt={name} loader={<Skeleton circle={true} width={214} height={214}/>}/>
    </div>)