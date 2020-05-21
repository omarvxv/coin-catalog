import React from "react";
import {Input, InputBlock, InputName} from "./styles";

export default ({ children, ...props }) => <InputBlock>
                                               <InputName>{children}</InputName>
                                               <Input {...props}/>
                                           </InputBlock>