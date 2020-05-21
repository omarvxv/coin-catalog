import React from "react";
import {Description, DescriptionBlock, InputName} from "./styles";

export default ({children, ...props}) => <DescriptionBlock>
                                            <InputName>{children}</InputName>
                                            <Description {...props}/>
                                        </DescriptionBlock>