import React from "react";
import Style from './coin.module.scss';
import Skeleton from "react-loading-skeleton/lib";

function CoinPreviewGhost() {
    return (
        <div className={Style.preview}>
            <Skeleton circle={true} width="7.5rem" height="7.5rem"/>
            <div className={Style.shortInfo}>
                <Skeleton width="9.375rem" height="1.25rem"/>
                <Skeleton count={2} width="12.5rem" height="1rem"/>
            </div>
        </div>
    )
}

export default CoinPreviewGhost;

