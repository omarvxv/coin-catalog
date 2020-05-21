import React from "react";
import Style from './coin.module.scss';
import {Link} from "react-router-dom";
import seenIcon from '../../img/seen.webp'
import Img from "react-image";
import Skeleton from "react-loading-skeleton";

function CoinPreview({id, avers, name, shortdesc, seen, admin}) {
    return (
        <div className={Style.preview}>
            <Img src={avers} alt="avers" loader={<Skeleton circle={true} width={120} height={120}/>}/>
            <div className={Style.shortInfo}>
                <Link to={"/coin-screen/" + id}>{name || <Skeleton/>}</Link>
                {admin && <><img src={seenIcon} alt="seen"/>&nbsp;{seen}</>}
                <p className={Style.about}>{shortdesc || <Skeleton count={2}/>}</p>
            </div>
        </div>
    )
}

export default CoinPreview;