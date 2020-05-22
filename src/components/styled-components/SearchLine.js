import React, {useState} from "react";
import InputField from "./InputField";
import {AdvancedFilter, Button, Filter, SearchForm, SearchField, AdvancedFilterColumn} from "./styles";
import {connect} from 'react-redux';
import './animation.css';
import {CSSTransition} from "react-transition-group";
import up from '../../img/up.png'
import down from '../../img/down.png'
import IntervalField from "./IntervalField";
import DropDown from "./DropDown";
import {Link} from "react-router-dom";
import {setCriteria} from "../../redux/actions/searchCriteria";

function SearchLine({admin, homePage, countries, qualities, compositions, setCriteria, criteria}) {
    const [toggle, setToggle] = useState(false),
        [keyword, setKeyword] = useState((criteria.keyword) || ''),
        [country, setCountry] = useState((!admin && criteria.country) || ''),
        [composition, setComposition] = useState((!admin && criteria.composition) || ''),
        [quality, setQuality] = useState((!admin && criteria.quality) || ''),
        [priceFrom, setPriceFrom] = useState((!admin && criteria.priceFrom) || ''),
        [priceTo, setPriceTo] = useState((!admin && criteria.priceTo) || ''),
        [yearFrom, setYearFrom] = useState((!admin && criteria.yearFrom) || ''),
        [yearTo, setYearTo] = useState((!admin && criteria.yearTo) || '');

    function search() {
        setToggle(false);
        const criteria = {keyword, country, composition, quality, priceFrom, priceTo, yearFrom, yearTo};
        setCriteria(criteria);
    }

    return <SearchForm>
        <SearchField homePage={homePage}>
            <InputField value={keyword} onChange={e => setKeyword(e.target.value)}>Input field</InputField>
            <Link to={!admin ? "/list/" : "/admin/"}>
                <Button onClick={search} type="submit">Search</Button>
            </Link>
        </SearchField>
        {!admin && <Filter onClick={() => {setToggle(!toggle)}}>
            <span>Advanced filter</span>
            <img src={toggle ? up : down} alt="arrow"/>
        </Filter>}
        <CSSTransition in={toggle} classNames="searchLine" timeout={500} mountOnEnter unmountOnExit>
            <AdvancedFilter>
                <AdvancedFilterColumn>
                    <DropDown value={country} setField={setCountry} values={countries}>Issuing country</DropDown>
                    <DropDown value={composition} setField={setComposition} values={compositions}>Metal</DropDown>
                    <DropDown value={quality} setField={setQuality} values={qualities}>Quality of the coin</DropDown>
                </AdvancedFilterColumn>
                <AdvancedFilterColumn>
                    <IntervalField setFrom={setPriceFrom} valueFrom={priceFrom} setTo={setPriceTo} valueTo={priceTo}>Price</IntervalField>
                    <IntervalField setFrom={setYearFrom} valueFrom={yearFrom} setTo={setYearTo} valueTo={yearTo}>Year of issue</IntervalField>
                </AdvancedFilterColumn>
            </AdvancedFilter>
        </CSSTransition>
    </SearchForm>
}

const mapStateToProps = state => ({
    criteria: state.searchCriteria.searchCriteria,
    countries: state.searchCriteria.countries,
    qualities: state.searchCriteria.qualities,
    compositions: state.searchCriteria.compositions
})

export default connect(mapStateToProps, {setCriteria})(SearchLine);