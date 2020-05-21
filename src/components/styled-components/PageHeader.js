import React from "react";
import {Admin, HeaderBlock, Hierarchy, PageName} from "./styles";
import {Link} from "react-router-dom";

export default ({children, showLink, homePage}) =>
    <>
        <HeaderBlock>
            <PageName>{children}</PageName>
            {showLink && <Link to="/admin/"><Admin>Admin panel</Admin></Link>}
        </HeaderBlock>
        {!homePage && (<Hierarchy><Link to="/">Homepage</Link> - {children}</Hierarchy>)}
    </>