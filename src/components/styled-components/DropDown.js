import React, {useState} from "react";
import down from '../../img/down.png';
import './animation.css';
import {InputBlock, InputName, DropDownLine, DropDownContainer, DropDownItem} from "./styles";
import {CSSTransition} from "react-transition-group";

function DropDown({children, values, value, setField}) {
    const [toggle, setToggle] = useState(false);

    function setDropDown (country) {
        setField(country);
        setToggle(!toggle);
    }

    return <InputBlock>
                <InputName>{children}</InputName>
                <DropDownLine onClick={() => {setToggle(!toggle)}}>
                    {value}
                    <img src={down} alt={down}/>
                </DropDownLine>
                <CSSTransition in={toggle} classNames="dropdown" timeout={200} mountOnEnter unmountOnExit>
                    <DropDownContainer>
                        {values.map(value => <DropDownItem key={value} onClick={() => setDropDown(value)}>{value}</DropDownItem>)}
                    </DropDownContainer>
                </CSSTransition>
            </InputBlock>


}

export default DropDown;