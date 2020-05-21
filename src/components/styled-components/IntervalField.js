import React from "react";
import {Input, InputBlock, InputName, Interval} from "./styles";

export default ({children, setFrom, setTo, valueFrom, valueTo}) =>
    <InputBlock>
        <InputName>{children}</InputName>
        <Interval>
            from <Input onChange={e => setFrom(e.target.value)} value={valueFrom} short/>
            to <Input onChange={e => setTo(e.target.value)} value={valueTo} short/>
        </Interval>
    </InputBlock>