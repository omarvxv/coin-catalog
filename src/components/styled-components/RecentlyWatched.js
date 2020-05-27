import React, {useState} from 'react';
import './animation.css';
import recently from '../../img/recently.png';
import {RecentlyBlock, RecentlyCount, RecentlyIcon, RecentlyLink} from "./styles";
import {CSSTransition} from "react-transition-group";
import Img from "react-image";
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";

function RecentlyWatched() {
    const [toggle, setToggle] = useState(false);
    const content = JSON.parse(sessionStorage.getItem('recently'));
    return (
        <>
            <RecentlyLink>
                <RecentlyIcon onClick={() => setToggle(!toggle)}>
                    <img src={recently} alt={recently} title="Recently watched"/>
                    {content ? <RecentlyCount>{content.length}</RecentlyCount> : ''}
                </RecentlyIcon>
            </RecentlyLink>
            <CSSTransition in={content && toggle}
                           classNames="recently"
                           timeout={200}
                           mountOnEnter
                           unmountOnExit>
                <RecentlyBlock>
                    {content && content.map(coin =>
                        <Link key={coin.id} title={coin.name} to={"/coin-screen/" + coin.id}>
                            <Img src={coin.avers} alt="avers"
                                 loader={<Skeleton circle={true} width={120} height={120}/>}/>
                        </Link>)}
                </RecentlyBlock>
            </CSSTransition>
        </>
    )
}

export default RecentlyWatched;