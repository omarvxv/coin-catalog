import React from "react";
import Style from './coin.module.scss';
import Skeleton from "react-loading-skeleton/lib";

function CoinPreviewGhost() {
    return (
        <div className={Style.preview}>
            <Skeleton circle={true} width={120} height={120}/>
            <div className={Style.shortInfo}>
                <Skeleton width={150} height={20}/>
                <Skeleton count={2} width={200} height={15}/>
            </div>
        </div>
    )
}

export default CoinPreviewGhost;

