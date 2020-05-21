import React from "react";
import {Admin, HeaderBlock, PageName} from "./styles";
import {Link} from "react-router-dom";

export default ({children, showLink}) =>
    <HeaderBlock>
        <PageName>{children}</PageName>
        {showLink && <Link to="/admin/"><Admin>Admin panel</Admin></Link>}
    </HeaderBlock>