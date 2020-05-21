import React, {useEffect} from "react";
import Style from './coinScreen.module.scss'
import {connect} from 'react-redux';
import Img from "react-image";
import Skeleton from "react-loading-skeleton";
import {clearCoinInfo, getCoinInfo} from "../../redux/actions/coin";

function CoinScreen({getCoinInfo, coin, clearCoinInfo, ...ownProps}) {
    const id = ownProps.match.params.id;
    useEffect(() => {
        getCoinInfo(id, true);

        return clearCoinInfo;
    }, [id]);

    const {name,avers,revers,shortdesc,description,country,
        composition,quality,denomination,year,weight,price} = coin;

    return <div className={Style.screen}>
                <div className={Style.coinScreen}>
                    <div className={Style.image}>
                        <Img src={avers} alt="avers" loading="lazy" loader={<Skeleton circle={true} height={300} width={300}/>}/>
                        <Img src={revers} alt="revers" loading="lazy" loader={<Skeleton circle={true} height={300} width={300}/>}/>
                    </div>
                    <div className={Style.aboutCoin}>
                        <div className={Style.container}>
                            <h3>{name || <Skeleton />}</h3>
                            <div className={Style.paragraphs}>
                                <p>{shortdesc || <Skeleton count={2}/>}</p>
                                {description ? description.split('|')
                                    .map((text, i) => <p key={i}
                                                         dangerouslySetInnerHTML={{__html: text}}/>)
                                : <Skeleton count={10} />}
                            </div>
                            <table>
                                <tbody>
                                <tr>
                                    <td>Issuing Country</td>
                                    <td>{country || <Skeleton />}</td>
                                </tr>
                                <tr>
                                    <td>Composition</td>
                                    <td>{composition || <Skeleton />}</td>
                                </tr>
                                <tr>
                                    <td>Quality</td>
                                    <td>{quality || <Skeleton />}</td>
                                </tr>
                                <tr>
                                    <td>Denomination</td>
                                    <td>{denomination || <Skeleton />}</td>
                                </tr>
                                <tr>
                                    <td>Year</td>
                                    <td>{year || <Skeleton />}</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td>{weight || <Skeleton />}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>{price || <Skeleton />}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className={Style.goBackLink} onClick={ownProps.history.goBack}>Back to the list</div>
                        </div>
                    </div>
                </div>
            </div>
}

const mapStateToProps = state => ({
    coin: state.showCoin.coin,
})

export default connect(mapStateToProps, {getCoinInfo, clearCoinInfo})(CoinScreen);